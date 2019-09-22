
class Playlist:
    def __init__(self, title=None, numVideos=None, user=None, lastUpdated=None, videos={}):
        self.title = title
        self.numVideos = numVideos
        self.user = user
        self.lastUpdated = lastUpdated
        self.videos = videos

class Video:
    def __init__(
        self,
        authorUrl,
        channelId, 
        datePublished, 
        description, 
        duration,
        genre,
        imageUrl,
        interactionCount,
        isFamilyFriendly,
        keywords,
        name,
        paid,
        regionsAllowed,
        unlisted,
        uploadDate,
        url,
        videoId,
        watchViewCount,
    ):
        self.authorUrl = authorUrl
        self.channelId = channelId
        self.datePublished = datePublished
        self.description = description
        self.duration = duration
        self.genre = genre
        self.imageUrl = imageUrl
        self.interactionCount = interactionCount
        self.isFamilyFriendly = isFamilyFriendly
        self.keywords = keywords
        self.name = name
        self.paid = paid
        self.regionsAllowed = regionsAllowed
        self.unlisted = unlisted
        self.uploadDate = uploadDate
        self.url = url
        self.videoId = videoId
        self.watchViewCount = watchViewCount
