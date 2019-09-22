#!/usr/bin/env python3

import constants
from get_video_ids import get_video_ids
from update_video_metadata import update_video_metadata

def scraper(playlist_url, datafile, full_update):
    get_video_ids(playlist_url, datafile)
    update_video_metadata(datafile, full_update)

    # https://xkcd.com/681/
    # https://www.youtube.com/watch?v=zSgiXGELjbc
    print("A still more glorious dawn awaits!")

if __name__ == "__main__":
    scraper(constants.JRE_UPLOADS_PLAYLIST_URL, constants.JRE_JSON, full_update=False)
