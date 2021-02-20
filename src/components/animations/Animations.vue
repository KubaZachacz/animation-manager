<template>
  <div class="animation">
    <div class="animation__container">
      <animation-preview :imgData="imgData" :imgState="imgState" />
    </div>
    <div class="animation__settings">
      <ul class="settings">
        <li
          v-for="group in imgData.elements"
          :key="group.selector"
          class="settings__group"
        >
          <span class="settings__group-title"> {{ group.selector }}</span>

          <input
            type="checkbox"
            :id="group.selector"
            name="active"
            :checked="imgControls[group.selector].active"
            @change="handleGroupChange($event, group.selector)"
          />

          <ul
            class="group"
            v-bind:class="{ 'group--disabled': !imgControls[group.selector].active }"
          >
            <li
              v-for="element in group.elements"
              :key="group + element.selector"
              class="group__element"
            >
              <label class="group__element-title">{{ element.selector }}</label>
              <input
                type="color"
                name="color"
                v-model="imgState[group.selector][element.selector]"
                @input="onInput($event, group.selector, element.selector)"
                :disabled="!imgControls[group.selector].active"
              />
            </li>
          </ul>
        </li>
      </ul>
      <button v-on:click="reloadState">Reload</button>
    </div>
  </div>
</template>

<script>
import AnimationPreview from "./AnimationPreview.vue";

import animationsConfig from "./animations_config.js";

import returnImgState from "../../utils/returnImgState";
import initControls from "../../utils/initControls";

const imgData = animationsConfig[0];

export default {
  name: "Animations",
  props: {
    msg: String,
  },
  components: {
    AnimationPreview,
    // FirstStart
  },
  data() {
    return {
      imgData: imgData,
      imgState: returnImgState(imgData),
      imgControls: initControls(imgData),
      imgPreset: {}
    };
  },
  // mounted() {
  //   console.log(returnImgState(imgData))
  // },
  methods: {
    onInput(e, group, element) {
      // const elements = document.querySelectorAll(`${group} ${element}`);
      const groupPreset = {
        ...this.imgPreset[group],
        [element]:e.target.value
      }

      this.imgPreset[group] = groupPreset;
      // for (let elem of elements) {
      //   elem.style.fill = e.target.value;
      // }
    },
    reloadState() {
      this.imgState = returnImgState(imgData, this.imgPreset);
    },
    handleGroupChange(e, group) {
      this.imgControls[group][e.target.name] = e.target.checked;

      if(e.target.checked) {
        this.imgPreset[group] = this.imgState[group];
      }
      else {
        const newPreset = {...this.imgPreset};

        delete newPreset[group];

        this.imgPreset = newPreset;
      }
    }
  },
};
</script>

<style lang="scss">
.animation {
  display: flex;

  &__container {
    width: 500px;
    min-width: 500px;
  }
}

.settings {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  font-size: 14px;

  &__group {
    min-width: 100px;
    margin: 0 16px;
  }

  &__group-title {
    font-weight: bold;
  }
}

.group {
  list-style: none;
  padding: 0;

  &__element {
    margin: 8px 0;
    padding: 8px;
    border: 1px solid lightgray;
    border-radius: 4px;
  }

  &--disabled > &__element {
    background-color: rgb(241, 241, 241);
  }

  &__element-title {
    font-size: 12px;
    margin-bottom: 4px;
    display: block;
  }
}

@import "animations";
</style>