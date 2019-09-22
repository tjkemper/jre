import os
import json
from models import Playlist
import constants

def read_playlist(datafile):
    print("read_playlist_data")
    if not os.path.exists(full_path(datafile)):
        return Playlist()

    with open(full_path(datafile), 'r') as f:
        return Playlist(**json.loads(f.read()))

def write_playlist(playlist, datafile):
    with open(full_path(datafile), "w") as out:
        json.dump(playlist.__dict__, out, indent=4, sort_keys=True)

def full_path(relative_path):
    dirname = os.path.dirname(__file__)
    return os.path.join(dirname, relative_path)
