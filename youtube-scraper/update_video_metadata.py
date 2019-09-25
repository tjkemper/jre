#!/usr/bin/env python3

from concurrent.futures import ThreadPoolExecutor
from bs4 import BeautifulSoup
import os
import requests
import json
from datetime import datetime
import constants
import threading
from models import Playlist
import data


def update_video_metadata(datafile, full_update):
    playlist = data.read_playlist(datafile)
    
    with ThreadPoolExecutor(max_workers=100) as executor:
        for video_id in playlist.videos:
            if full_update or playlist.videos[video_id] is None:
                executor.submit(update_worker, video_id, playlist)
    
    data.write_playlist(playlist, datafile)

def update_worker(video_id, playlist):
    video_url = constants.YOUTUBE_VIDEO_URL_PREFIX + video_id
    response = requests.get(video_url)
    soup = BeautifulSoup(response.content, "html.parser")
    playlist.videos[video_id] = get_video_data(soup)
    print("Updated {}".format(video_id))

def get_video_data(soup):
    video_data = {}
    video_data["authorUrl"] = soup.find(itemprop="author").find(itemprop="url").get("href")
    video_data["channelId"] = soup.find(itemprop="channelId").get("content")
    video_data["datePublished"] = soup.find(itemprop="datePublished").get("content")
    video_data["description"] = soup.find(id="eow-description").string
    video_data["duration"] = soup.find(itemprop="duration").get("content")
    video_data["genre"] = soup.find(itemprop="genre").get("content")
    video_data["imageUrl"] = soup.find(property="og:image").get("content")
    video_data["interactionCount"] = int(soup.find(itemprop="interactionCount").get("content"))
    video_data["isFamilyFriendly"] = soup.find(itemprop="isFamilyFriendly").get("content")
    # TODO: Keywords are cut off.  Get full list.
    video_data["keywords"] = soup.find("meta", {"name": "keywords"}).get("content")
    video_data["name"] = soup.find(itemprop="name").get("content")
    video_data["paid"] = soup.find(itemprop="paid").get("content")
    video_data["regionsAllowed"] = soup.find(itemprop="regionsAllowed").get("content")
    video_data["unlisted"] = soup.find(itemprop="unlisted").get("content")
    video_data["uploadDate"] = soup.find(itemprop="uploadDate").get("content")
    video_data["url"] = soup.find(itemprop="url").get("href")
    video_data["videoId"] = soup.find(itemprop="videoId").get("content")

    watch_view_count_str = soup.find(class_="watch-view-count").string
    watch_view_count = int(watch_view_count_str.split()[0].replace(",", ""))
    video_data["watchViewCount"] = watch_view_count

    return video_data

if __name__ == "__main__":
    update_video_metadata(constants.FTC_JSON, full_update=False)
