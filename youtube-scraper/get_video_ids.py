#!/usr/bin/env python3

from bs4 import BeautifulSoup
import os
import requests
import json
import re
from datetime import datetime
import constants
from models import Playlist
import data
from retrying import retry


def get_video_ids(playlist_url, datafile):
    print("Starting")
    playlist_data = data.read_playlist(datafile)
    video_url = get_first_video_url(playlist_url)
    update_playlist_data(playlist_data, video_url)

    num_new_videos = playlist_data.numVideos - len(playlist_data.videos)
    print("{} new videos".format(num_new_videos))

    try: 
        for i in range(playlist_data.numVideos):
            if playlist_data.numVideos == len(playlist_data.videos):
                print("Breaking: playlist_data.numVideos == len(playlist_data.videos)")
                break

            print("Count:", str(i), video_url)
            video_id = get_video_id(video_url)
            if video_id not in playlist_data.videos:
                playlist_data.videos[video_id] = None

            video_url = get_next_video_url_fast(video_url, video_id)

        data.write_playlist(playlist_data, datafile)
    except Exception as e:
        data.write_playlist(playlist_data, datafile)
        print(str(e))

def get_video_id(url):
    return url.split("&")[0].split("=")[1]

def update_playlist_data(playlist_data, video_url):
    playlist_data.lastUpdated = datetime.today().strftime("%Y-%m-%d")

    playlist_details = get_playlist_details(video_url)
    playlist_data.numVideos = playlist_details["numVideos"]
    playlist_data.title = playlist_details["title"]
    playlist_data.user = playlist_details["user"]

def get_playlist_details(video_url):
    print("get_playlist_details")
    video_html = requests.get(video_url)
    soup = BeautifulSoup(video_html.content, "html.parser")

    playlist_info_tag = soup.find(class_="playlist-info")
    playlist_title_tag = playlist_info_tag.find(class_="playlist-title")
    playlist_details_tag = playlist_info_tag.find(class_="playlist-details")

    title = playlist_title_tag.find("a").string
    user = playlist_details_tag.find("a").string
    num_videos_str = playlist_details_tag.find(id="playlist-length").string
    num_videos = int(num_videos_str.split()[0].replace(",", ""))

    details = {
        "title": title,
        "user": user,
        "numVideos": num_videos
    }
    return details

def get_first_video_url(playlist_url):
    print("get_first_video_url")
    playlist_html = requests.get(playlist_url)
    soup = BeautifulSoup(playlist_html.content, "html.parser")
    return constants.YOUTUBE_URL + soup.find(class_="pl-header-play-all-overlay").get("href")

# TODO: Always return https://www.youtube.com/watch?v=ZZ5LpwO-An4
def get_next_video_url(video_url):
    print("get_next_video_url")
    video_html = requests.get(video_url)
    soup = BeautifulSoup(video_html.content, "html.parser")
    next_video_anchor = soup.find("a", title="Next video")
    return constants.YOUTUBE_URL + next_video_anchor.get("href")

@retry(wait_exponential_multiplier=100, wait_exponential_max=10000)
def get_next_video_url_fast(video_url, video_id):
    try:
        print("get_next_video_url_fast")
        response = requests.get(video_url)
        next_video_anchor_tag = re.search("<a.*Next video.*", response.text).group()
        next_video_url_suffix = next_video_anchor_tag.split("\"")[1]
        return constants.YOUTUBE_URL + next_video_url_suffix
    except Exception as e:
        print(str(e))
        print("Try again")
        raise e

if __name__ == "__main__":
    get_video_ids(constants.FTC_PLAYLIST_URL, constants.FTC_JSON)




