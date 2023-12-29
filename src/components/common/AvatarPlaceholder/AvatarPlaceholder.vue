<template>
    <div
      class="avatar-placeholder rounded-full flex items-center justify-center"
      :style="{ backgroundColor: avatarColor, color: textColor }"
    >
      {{ initials }}
    </div>
  </template>
  
  <script>
  export default {
    name: "AvatarPlaceholder",
    props: {
      username: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        default: 50, // Default size of the avatar
      },
    },
    computed: {
      initials() {
        // Get the first letter of the first two words in the username
        let matches = this.username.match(/\b(\w)/g); // Match the first letter of each word
        let initials = matches ? matches.slice(0, 2).join("") : ""; // Take only the first two
        return initials.toUpperCase();
      },
      avatarColor() {
        // Generate a color based on the hash of the username
        let hash = 0;
        for (let i = 0; i < this.username.length; i++) {
          hash = this.username.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = (hash & 0x00ffffff).toString(16).toUpperCase();
        return "#" + "00000".substring(0, 6 - color.length) + color;
      },
      avatarSize() {
        // Convert size prop to a string with px unit
        return `${this.size}px`;
      },
      textColor() {
        // White color for better contrast
        return "white";
      },
    },
  };
  </script>
  
  <style scoped>
  .avatar-placeholder {
    width: var(--avatar-size);
    height: var(--avatar-size);
    font-weight: bold;
    font-size: calc(
      var(--avatar-size)
    ); /* Adjust font size based on the size of the avatar */
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: center;
  }
  </style>
  