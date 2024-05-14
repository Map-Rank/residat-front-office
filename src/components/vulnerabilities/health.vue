<script>
export default {
  name: 'healthVulnerability'
}
</script>

<template>
  <div class="w-full mx-auto">
    <div>
      <p class="text-center">
        <b>
          % Vulnerable to climate health risks
        </b>
      </p>
      <div class="flex p-2 items-center border border-gray-300 rounded-md">
        <div class="pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="66">
            <rect width="100%" height="100%" fill="white"/>
            <image xlink:href="data:image/png;base64,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" x="0" y="0" width="56" height="66"/>
          </svg>
        </div>
        <label class="w-full h-16 p-2 rounded-md" type="text">Data coming here</label>
      </div>
    </div>

    <div class="mt-2">
      <p class="text-center">
        <b>
          Report cases in last 30 days
        </b>
      </p>
      <div class="flex p-2 items-center border border-gray-300 rounded-md">
        <div class="pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="66">
            <rect width="100%" height="100%" fill="white"/>
            <image xlink:href="data:image/png;base64,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" x="0" y="0" width="58" height="82"/>
          </svg>
        </div>
        <label class="w-full h-16 p-2 rounded-md" type="text">Data coming here</label>
      </div>
    </div>

    <div class="mt-2">
      <p class="text-center">
        <b>
          Doctor to patient ratio
        </b>
      </p>
      <div class="flex p-2 items-center border border-gray-300 rounded-md">
        <div class="pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="66">
            <rect width="100%" height="100%" fill="white"/>
            <image xlink:href="data:image/png;base64,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" x="0" y="0" width="51" height="57"/>
          </svg>
        </div>
        <label class="w-full h-16 p-2 rounded-md" type="text">Data coming here</label>
      </div>
    </div>

    <div class="mt-2">
      <p class="text-center">
        <b>
          Total number of health units
        </b>
      </p>
      <div class="flex p-2 items-center border border-gray-300 rounded-md">
        <div class="pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="66">
            <rect width="100%" height="100%" fill="white"/>
            <image xlink:href="data:image/png;base64,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" x="0" y="0" width="61" height="63"/>
          </svg>
        </div>
        <label class="w-full h-16 p-2 rounded-md" type="text">Data coming here</label>
      </div>
    </div>

    <a href="#">
      <p class="text-center underline text-blue-700">
        additional data
      </p>
    </a>
  </div>
</template>

<style scoped>

</style>