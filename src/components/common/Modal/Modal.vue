<script>

import Health  from '@/components/vulnerabilities/health.vue'
import agricultural from '@/components/vulnerabilities/agricultural.vue'
import infrastructure from '@/components/vulnerabilities/infrastructure.vue'
import social from '@/components/vulnerabilities/social.vue'
import foodSecurity from '@/components/vulnerabilities/foodSecurity.vue'
import migration from '@/components/vulnerabilities/migration.vue'
import waterStress from '@/components/vulnerabilities/waterStress.vue'


  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Modal',

    components: {
   
    Health ,
    agricultural,
    infrastructure,
    social,
    foodSecurity,
    migration,
    waterStress,

  },
 
    data(){
        return{
            show:true,
            showComponent:true,
            modalStates: {
        healthVisible: true,
        agricultureVisible: false,
        infrastructureVisible: false,
        socialVisible: false,
        foodSecurityVisible: false,
        migrationVisible: false,
        waterStressVisible: false
      },
        }
    },
    props: ['component'],
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>


    <template>
        <transition name="modal-fade">
          <div v-if="show" class="modal-backdrop">
            <div class="modal p-4 rounded-lg" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
              <header class="modal-header mb-10" id="modalTitle">
                <button type="button" class="btn-close" @click="close" aria-label="Close modal">x</button>
              </header>
              <div class="grid ">
                <Health  v-if="modalStates.healthVisible"></Health >
                <agricultural v-if="modalStates.agricultureVisible"></agricultural>
                <infrastructure v-if="modalStates.infrastructureVisible"></infrastructure>
                <social v-if="modalStates.socialVisible"></social>
                <food-security v-if="modalStates.foodSecurityVisible"></food-security>
                <migration v-if="modalStates.migrationVisible"></migration>
                <water-stress v-if="modalStates.waterStressVisible"></water-stress>
              </div>
             
      
    
            </div>
          </div>
        </transition>
    </template>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    width: 40%;

    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }


  .modal-header {
    position: relative;

    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>