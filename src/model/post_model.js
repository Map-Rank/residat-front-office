// eslint-disable-next-line no-unused-vars
class Post {
  constructor({postId, publishedDate, zone, sectors, imagesUrl, content, user, likeCount, shareCount, commentCount, zonePostId, postSectors, imagesFilePaths, liked, likeTapped, commentTapped, shareTapped, commentList, zoneLevelId, zoneParentId, isFollowing} = {}) {
    this.postId = postId;
    this.publishedDate = publishedDate;
    this.zone = zone;
    this.sectors = sectors;
    this.imagesUrl = imagesUrl;
    this.content = content;
    this.user = user;
    this.likeCount = likeCount;
    this.shareCount = shareCount;
    this.commentCount = commentCount;
    this.zonePostId = zonePostId;
    this.postSectors = postSectors;
    this.imagesFilePaths = imagesFilePaths;
    this.liked = liked;
    this.likeTapped = likeTapped;
    this.commentTapped = commentTapped;
    this.shareTapped = shareTapped;
    this.commentList = commentList;
    this.zoneLevelId = zoneLevelId;
    this.zoneParentId = zoneParentId;
    this.isFollowing = isFollowing;
  }}