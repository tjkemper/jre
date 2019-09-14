#!/usr/bin/env python3

from bs4 import BeautifulSoup
import requests
import json
from datetime import datetime
import constants

# TODO: Command line options: outfile, first_video_in_playlist_url
# TODO: Refactor to take in playlist_url (instead of first_video_in_playlist_url)
# TODO: Write to file periodically to avoid memory issues (although JRE had no issues at 4.5MB and is possibly one of the larger playlists)
# TODO: Create classes for 'data' and 'video_data'
# TODO: Create constants for the web scraping strings (id, class, and attribute names/values)
def scraper(first_video_in_playlist_url):
    video_url = first_video_in_playlist_url
    playlist_details = get_playlist_details(video_url)

    data = {
        "currentDate": datetime.today().strftime("%Y-%m-%d"),
        "numVideos": playlist_details["numVideos"],
        "playlistTitle": playlist_details["playlistTitle"],
        "user": playlist_details["user"],
        "videos": []
    }

    for i in range(playlist_details["numVideos"]):
        video_html = requests.get(video_url)
        soup = BeautifulSoup(video_html.content, "html.parser")
        data["videos"].append(get_video_data(soup))
        print("Count:", str(i))

        if not has_next_video(soup):
            print("Next video does not exist. Breaking.")
            break

        video_url = get_next_video_url(soup)        

    outfile = default_outfile(data["playlistTitle"], data["currentDate"])
    pretty_write(data, outfile)

    # https://xkcd.com/681/
    # https://www.youtube.com/watch?v=zSgiXGELjbc
    print("A still more glorious dawn awaits!")

def get_playlist_details(video_url):
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
        "playlistTitle": title,
        "user": user,
        "numVideos": num_videos
    }
    return details

def get_video_data(soup):
    video_data = {}
    video_data["authorUrl"] = soup.find(itemprop="author").find(itemprop="url").get("href")
    video_data["channelId"] = soup.find(itemprop="channelId").get("content")
    video_data["datePublished"] = soup.find(itemprop="datePublished").get("content")
    video_data["description"] = soup.find(itemprop="description").get("content")
    video_data["duration"] = soup.find(itemprop="duration").get("content")
    video_data["genre"] = soup.find(itemprop="genre").get("content")
    video_data["imageUrl"] = soup.find(property="og:image").get("content")
    # TODO: interactionCount to int
    video_data["interactionCount"] = soup.find(itemprop="interactionCount").get("content")
    video_data["isFamilyFriendly"] = soup.find(itemprop="isFamilyFriendly").get("content")
    video_data["keywords"] = soup.find("meta", {"name": "keywords"}).get("content")
    video_data["name"] = soup.find(itemprop="name").get("content")
    video_data["paid"] = soup.find(itemprop="paid").get("content")
    video_data["regionsAllowed"] = soup.find(itemprop="regionsAllowed").get("content")
    video_data["unlisted"] = soup.find(itemprop="unlisted").get("content")
    video_data["uploadDate"] = soup.find(itemprop="uploadDate").get("content")
    video_data["url"] = soup.find(itemprop="url").get("href")
    video_data["videoId"] = soup.find(itemprop="videoId").get("content")
    # TODO: watchViewCount to int
    video_data["watchViewCount"] = soup.find(class_="watch-view-count").string
    return video_data

# TODO: Always return https://www.youtube.com/watch?v=ZZ5LpwO-An4
def get_next_video_url(soup):
    next_video_anchor = soup.find("a", title="Next video")
    return constants.YOUTUBE_URL + next_video_anchor.get("href")

# TODO: This function does not consistently work. Find better method.
def has_next_video(soup):
    next_video_anchor = soup.find("a", title="Next video")
    if not next_video_anchor.get("data-normal-next-clicktracking"):
        return False

    return True

def pretty_write(data, outfile):
    with open(outfile, "w") as out:
        json.dump(data, out, indent=4, sort_keys=True)

def default_outfile(playlistTitle, currentDate):
    return playlistTitle + constants.OUTFILE_SEPARATOR + currentDate + constants.JSON_EXTENSION

if __name__ == "__main__":
    scraper(constants.JRE_UPLOADS_PLAYLIST_FIRST_VIDEO_URL)
