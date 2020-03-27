.PHONY: update, update-simple, get_video_ids, update_video_metadata, pip-install, log, clean

update: log pip-install
	time python3 -u youtube_scraper.py &> log/scraper.log &
	tail -f log/scraper.log

update-simple:
	python -u youtube_scraper.py

get-video-ids: log
	time python3 -u get_video_ids.py &> log/get-video-ids.log &
	tail -f log/get-video-ids.log

update-video-metadata: log
	time python3 -u update_video_metadata.py &> log/update-video-metadata.log &
	tail -f log/update-video-metadata.log

pip-install:
	pip install -r requirements.txt

log:
	mkdir -p log

clean:
	rm -r log/
	rm ftc.json
