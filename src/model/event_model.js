// eslint-disable-next-line no-unused-vars
class Event {
  constructor({
    eventId,
    publishedDate,
    title,
    zone,
    sectors,
    imagesUrl,
    content,
    eventCreatorId,
    organizer,
    zoneEventId,
    eventSectors,
    imagesFileBanner,
    startDate,
    endDate,
    zoneParentId,
    zoneLevelId,
  }) {
    this.eventId = eventId;
    this.publishedDate = publishedDate;
    this.title = title;
    this.zone = zone;
    this.sectors = sectors;
    this.imagesUrl = imagesUrl;
    this.content = content;
    this.eventCreatorId = eventCreatorId;
    this.organizer = organizer;
    this.zoneEventId = zoneEventId;
    this.eventSectors = eventSectors;
    this.imagesFileBanner = imagesFileBanner;
    this.startDate = startDate;
    this.endDate = endDate;
    this.zoneParentId = zoneParentId;
    this.zoneLevelId = zoneLevelId;
  }

}
