<template>
  <div class="h-full bg-slate-500">
    <div
      class="w-full h-screen px-100 bg-white justify-between grid-cols-1 sm:grid md:grid-cols-8 gap-2"
    >
      <div class="col-span-6"></div>
      <div class="h-2/3 col-span-2 pt-8">
        <div class="mb-6">
          <BaseDropdown :options="hazard" />
        </div>

        <key-actors
          :sectionTitle="'KEY ACTORS'"
          :actors="actors"
         />
      </div>
    </div>
  </div>
</template>

<script>
import BaseDropdown from '@/components/base/BaseDropdown.vue'
// import SectionTitle from '@/components/base/SectionTitle.vue'
import KeyActors from '@/components/common/KeyActors/KeyActor.vue'

export default {
  name: 'DashBoardView',
  data() {
    return {
      hazard: [
        { id: 1, name: 'Floods' },
        { id: 2, name: 'Drought' }
      ],
      actors: [
        { 
          title: 'Unicef',
          logoUrl: 'https://th.bing.com/th/id/R.c215149a745003175ddd655e61354b5d?rik=Pqwr0cNGR4XuXA&pid=ImgRaw',
          name: 'Unicef'
        },
        { 
          title: 'Wealth Health Organization',
          logoUrl: 'https://logos-world.net/wp-content/uploads/2021/03/World-Health-Organization-WHO-Symbol.png',
          name: 'Wealth Health Organization'
        },
        { 
          title: 'Event 3',
          logoUrl: 'https://th.bing.com/th/id/R.16993675fe4104ffd838eaf642447350?rik=z4n%2fwfldXMhA1g&pid=ImgRaw&r=0',
          name: 'Government'
        },
        // Add more events as needed
      ]
    }
  },
  components: {
    // UnderConstruction,
    BaseDropdown,
    KeyActors
  }
}
</script>
