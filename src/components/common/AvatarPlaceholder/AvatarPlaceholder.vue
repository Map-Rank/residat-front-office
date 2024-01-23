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
    },
    computed: {
      initials() {
        let matches = this.username.match(/\b(\w)/g); 
        let initials = matches ? matches.slice(0, 2).join("") : ""; 
        return initials.toUpperCase();
      },
      avatarColor() {
        let hash = 0;
        for (let i = 0; i < this.username.length; i++) {
          hash = this.username.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = (hash & 0x00ffffff).toString(16).toUpperCase();
        return "#" + "00000".substring(0, 6 - color.length) + color;
      },
      textColor() {
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
    ); 
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: center;
  }
  </style>
  