# JRE
https://tjkemper.github.io/jre/

## Usage
```sh
# Update data
$ python3 ./youtube-scraper/youtube_scraper.py

# Deploy website
$ cd ./frontend/
$ npm run deploy
```

## Web scraper
The web scraper has two parts:
* Get video ids
* Update video metadata

### Reason for functional split

```python
response = requests.get(video_url) # fast
soup = BeautifulSoup(response.content, "html.parser") # slow
```

Learned facts:
* Creating the `BeautifulSoup` object is the most expensive operation.
* Web scraping requires sequential video access: 
  * Get first video
  * Get next video
  * Get next video
  * ...

We want to make the sequential part as inexpensive as possible: get video ids.

Once we have the video ids, updating video metadata can be done in parallel.

### Get video ids
**Input:** playlist_url, datafile  
**Output:** New video ids are saved to datafile

This function will iterate through the entire playlist until the number of stored video ids is the same as the playlist length.

### Update video metadata
**Input:** datafile, full_update  
**Output:** Video metadata saved to datafile

full_update: If True, update all videos.  Else, only update videos that have no metadata.

### Usage
Update `./frontend/src/data/jre.json`
```sh
python3 ./youtube-scraper/youtube_scraper.py
```

You can also run `get_video_ids.py` and `update_video_metadata.py` individually.

## Website
https://tjkemper.github.io/jre/

Served using GitHub Pages.  *Database* is a json file.

### Analytics (homepage)
Analytics provides several facts and graphs.

#### Facts
* Total views
* Number of videos
* Total time
* Most viewed video
* Longest video

#### Graphs
* Views over time
* Keyword frequency
* Keyword views
* Family friendly

### Search
Searchable & sortable table.

Are you curious to know which videos are not family friendly?

### Random
Get random video.
