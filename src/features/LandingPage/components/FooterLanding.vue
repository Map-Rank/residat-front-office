<template>
  <footer class="w-full bg-primary-normal py-15">
    <div class="container mx-auto px-4 md:px-[20px] lg:px-24 flex flex-col md:flex-row justify-between items-center lg:items-start gap-8">
      <!-- Logo Section -->
      <div class="w-[40%] grid justify-center lg:justify-start items-start gap-2">
        <div class="w-full flex justify-center md:justify-start">
          <img class="h-20" src="/assets/images/Logos/logo-small-white.svg" :alt="$t('footer_logo_alt')" />
        </div>
        <p class="text-white text-center md:text-left text-base font-normal font-poppins">
          {{ $t('footer_tagline') }}
        </p>
      </div>

      <!-- Links Sections -->
      <div v-for="section in sections" :key="section.title" class="w-full md:w-1/4 grid justify-center md:justify-center lg:justify-start items-center md:items-center lg:items-start gap-4 text-center md:text-center lg:text-left">
        <div class="text-white text-lg font-semibold font-poppins">{{ $t(section.title) }}</div>
        <div class="flex flex-col gap-2">
          <a v-for="link in section.links" :key="link.text" :href="link.href" class="text-white text-base font-normal font-poppins">{{ $t(link.text) }}</a>
        </div>
      </div>
    </div>
    <div class="text-center mt-14 text-white text-sm font-normal font-poppins leading-tight">
      {{ $t('footer_copyright') }}
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterLanding',
  data() {
    return {
      sections: [
        {
          title: 'footer_quick_links',
          links: [
            { text: 'footer_about_us', href: '#about-us' },
            { text: 'footer_solution', href: '#solution' },
            { text: 'footer_impact', href: '#impact' }
          ]
        },
        {
          title: 'footer_resources',
          links: [
            { text: 'footer_terms', href: '#terms' },
            { text: 'footer_cookies', href: '#cookies' }
          ]
        },
        {
          title: 'footer_social_media',
          links: [
            { text: 'footer_facebook', href: 'https://web.facebook.com/profile.php?id=100064106499810' },
            { text: 'footer_linkedin', href: 'https://www.linkedin.com/company/100603971/' }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
.py-15 {
  padding-top: 60px;
  padding-bottom: 60px;
}
</style>
