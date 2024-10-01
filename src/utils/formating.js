
import {URL_LINK} from '@/constants'

// utils.js

/**
 * Formats the given image string with the image host URL from URL_LINK.
 *
 * @param {string} currentImage The image path to be combined with the image host url.
 * @returns {string} The full image URL as a string.
 */
export function formatHostImageUrl(currentImage) {
  return `${URL_LINK.imageHostLink}${currentImage}`;
}


export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export function truncateText(text, maxLength) {
  return text.length > maxLength ? text.substring(0, maxLength) + '…' : text;
}


export function getZoomIndexByLevel(level_id) {
  switch (level_id) {
    case '1':
      return 7; 
    case '2':
      return 9; 
    case '3':
      return 10; 
    case '4':
      return 11; 
    default:
      return 7; 
  }
}

