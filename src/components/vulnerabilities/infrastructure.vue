<script>
export default {
  name: 'infrastructureVulnerability'
}
</script>

<template>
  <div class="w-1/2 mx-auto">
    <div>
      <p class="text-center">
        <b>
          Percentage exposure
        </b>
      </p>
      <div class="flex p-2 items-center border border-gray-300 rounded-md">
        <div class="pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="66">
            <rect width="100%" height="100%" fill="white"/>
            <image xlink:href="data:image/png;base64,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" x="0" y="0" width="56" height="66"/>
          </svg>
        </div>
        <input class="w-full h-16 p-2 rounded-md" type="text" placeholder="Your text here">
      </div>
    </div>

    <div class="mt-2">
      <p class="text-center">
        <b>
          At risk critical infrastructure
        </b>
      </p>
      <div class="flex p-2 items-center border border-gray-300 rounded-md">
        <div class="pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="66">
            <rect width="100%" height="100%" fill="white"/>
            <image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA5CAYAAACF8yP/AAAAAXNSR0IArs4c6QAABwtJREFUaEPtmQtQlNcVx3/sg10euwtIFJWXwRgQNmBErEpFJba2U2s12BHSSks0mrQ2mTbTdGyqM81kJplJqjPMtNOMTfMQHUOMSYPRtj4DaoWCWgQqbwMI7LqwLMsu7LPzfUarTZNhYZeXe2Zndmf27v3O7/zPuefeuwFut9vNfWYBfuj7RHG/0veJ0PiV9is9hSPgT+8pLO49aH6l/UpP4Qj409vX4nZ23qD0zAk62tvpN/djtQzicDqQSqVIJRJkchmB8kCCgoIICQ1BExbOd9ZuIFSl8qprY6K00+nkrT/9gfLyShxOJx03upFKJcTHRovvfSYzMplM/KzTGxgcHEKjVqFQBLI5fzOPrV4z+aAPHXibooPFyOVyZs+czpIli0mYO4/wiEiUQcG4XE4cdjtDQ0MMWgcwGPT09vRg6jPycJKWr2etmnzQhXte5ejxU0RGhhOkVLIofQFLMlcwf36KmNpjbWOS3kcOH6Kk5CgOhwPhnkZI4fBwDQ8lxDFj+gwS5iWSnKwlJjZuTPjHBFqo6Y+OFNPceI3zF6uwWAaJiAgjMiKMPlM/On0Pc+KjiZ4VRXRMLAvSF6PVpvosAGMCfdt7g8FA6dmTtF1vpqtbz9Xaemw2O8I1nUQSwNwH42i53k7ktHCSk+bxSNpCVmZ/Q1wLvGljCn234w0NDdTV/osb7a0Ye41crW3A0GMUFdfre+g3D6BShbAqaxnrN+YRFTXTa9zjBn03gU6n41JlOZ+1NqLT6blQflms/9DQYMxmC2tWL+d7OXnEx8/xCviEgL6bpLGxkXOlJ6iprqWuvok0bRIVVdU8vm4NP35qh9jPR2sTDvo20Ltv/ZGigx+Qqk2kvqGFuNjZrFv/OCtXPTZa5ol5R9bb28uH77/LofePiru0gIAAnE4XBfm5bMzNn3rQwgJ39sQnXKyooq2j6x7AzXkbyMvfNnWgq6urqSw/j8th5eSZC+JKrlQqmBYRJu7VQ4KD2JjzXTY9UTA5oYXNSktLC3V1tfT16Bi09ovpe/4flXTrDCJUkFLBhnXfpPjIMbGXL1qoJTkllU15Pxw/aJvNRldXF4GBgbf2z263eIKy2+3i4cHucGC1Wrmp19PXZ2TIOoDDYcNpt2G3D4mOd+tuUvPvRoxG0xdAslcsoexCJUNDNnHFfnpLLglJ6SQmJo4f9MH9bzI40C864MJNwOeuuHEjvoQgOJxYrYMY+/rRG3owGIzitvP/WWCgHJlMKm5R7zaJRML2gk3ojINs2Tr6ehbmHlHLam1t5tkdzzJks4066iuXf43IaWHY7HbOllXco7pQ04LC1xo72PbMDhQKxaifN2Lo3S/+iosVl4blgNBuomZEivvpWTOnc6NTR3VN/Z3fqtWhmEzmL8y1fNkiMtIfob65i63bnvbq/ttjpWuqr3Dm5DE+Pnb6jqMLUuczP3GumNKClRw/fQckOFhJ+qNa9Dd76OzUian+ZSb0ZGGsoH7V5ToylmaRmZk5rOB6Mshj6Beef44r1XWePOMrxwqHivQFWlJTHsbldvNZezdxCUlkZ2eLi6QvzCPoc2Wf8tJLL4/Yj9upHhszi/i4aObEzRb7cUNTG2pNJMsyM0lNSxvx/MP9oUfQv929k/qGZnHRcTqcEBAgnoNlwm2mTCpeBalVIahVoQi1eutdRUSYRvxeaHOdXXoMvSbcyIiJm0NGRgbx8fHD9dcr44YNXVNzlcsVn6JUKJDLZQitRKhhl+tWfxaOghaLFVO/GZvNgcstxESKRCZHrQknJjqa6JgY4uPiUKnVXnF+pJMMG9psNiPcfAhq2W02oRWLvVkqkyGXyZDJ5ahUKtRq9bhc9nkSgGFDezLpRB/rh57oCnnLP7/S3orkRJ9nAihtw9xrQaIOI3iM/uHxPbSlldIPizn09j6KSu3kflTH71crwNXDub0/4aevfMAVvR2p5iG+vfPPvPPLpWh8nCo+h3Zc+g0LlxRimimnrU1BQUkTb6xRwEAZO7OepOpbu/jFykBO7HqK1y4v443rJTw5zbfUPofGoqPNHErE33/A9PxynrgNLVw+WCzYg4NRYOav21NYe3gpBxoPkONjqX0P/blolqINPPA/0DBIyXPL+fXxDpqaHGQVlvKX7fPwdWmPM7SDq4f38HFdL9dK9lF0LYVXy/7Gz5NH/y/GVxXI+EFbWjn13j/RfD+HhcFgO/882qxCZr/eyKmfxfi0qH0O7equ5JPSZkwX9lCwt54VLxay5dEHSZO/yap1+9HkvcyunGg6i3fzwoGbbCxu4p31oZMbeujYVhLW7qPD+V+OgLBc3mt7nZBXNvPM3tNcH3CBMorFP/od+ws3keDb7B7ZbahXZbAZ6ey2onhgBhFKiVen/rLJfJ7eY0Lh4UP80B4GbNIO/w9vd5CDX/RQ1QAAAABJRU5ErkJggg==" x="0" y="0" width="56" height="66"/>
          </svg>
        </div>
        <input class="w-full h-16 p-2 rounded-md" type="text" placeholder="Your text here">
      </div>
    </div>

    <div class="mt-2">
      <p class="text-center">
        <b>
          At risk social infrastructure
        </b>
      </p>
      <div class="flex p-2 items-center border border-gray-300 rounded-md">
        <div class="pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="66">
            <rect width="100%" height="100%" fill="white"/>
            <image xlink:href="data:image/png;base64,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" x="0" y="0" width="56" height="66"/>
          </svg>
        </div>
        <input class="w-full h-16 p-2 rounded-md" type="text" placeholder="Your text here">
      </div>
    </div>

    <div class="mt-2">
      <p class="text-center">
        <b>
          Number of evacuation sites
        </b>
      </p>
      <div class="flex p-2 items-center border border-gray-300 rounded-md">
        <div class="pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="66">
            <rect width="100%" height="100%" fill="white"/>
            <image xlink:href="data:image/png;base64,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" x="0" y="0" width="56" height="66"/>
          </svg>
        </div>
        <input class="w-full h-16 p-2 rounded-md" type="text" placeholder="Your text here">
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