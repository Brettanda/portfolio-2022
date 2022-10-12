<template>
  <section class="carousel">
    <ol class="carousel__viewport">
      <li
        v-for="(item, index) of flatUnwrap($slots.default(), ['p'])"
        ref="viewportSlides"
        :key="index"
        :class="`carousel__slide ${index === 0 ? 'active' : ''}`"
      >
        <ContentSlot :use="() => item" unwrap="li" />
      </li>
    </ol>
    <button class="carousel__button--next" @click="moveNext()"></button>
    <button class="carousel__button--prev" @click="movePrev()"></button>
    <ol class="carousel__pagination" ref="pagination">
      <li
        v-for="(item, index) of flatUnwrap($slots.default(), ['p'])"
        :key="index"
        class="carousel__pagination-item"
      >
        <button
          class="carousel__pagination-button"
          ref="paginationButtons"
          type="button"
          :aria-label="`Navigate to slide ${index + 1}`"
          @click="moveIndex(Number(index))"
        ></button>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const viewportSlides = ref<HTMLLIElement[]>([]);
const paginationButtons = ref<HTMLButtonElement[]>([]);
const { unwrap, flatUnwrap } = useUnwrap();
let slide: number = 0;
let moving: boolean = true;

const itemClassName = "carousel__slide";
const itemClassPaginationName = "carousel__pagination-button";
let totalItems: number = 1;

const wrap = (num: number, min: number, max: number): number =>
  ((((num - min) % (max - min)) + (max - min)) % (max - min)) + min;

const moveIndex = (index: number) => {
  if (!moving) {
    const oldSlide = slide;
    slide = index;
    moveCarouselTo(oldSlide, index);
  }
};
const moveNext = () => {
  if (!moving) {
    if (slide === totalItems - 1) {
      slide = 0;
    } else {
      slide++;
    }
    moveCarouselTo(slide - 1, slide);
  }
};
const movePrev = () => {
  if (!moving) {
    if (slide === 0) {
      slide = totalItems - 1;
    } else {
      slide--;
    }

    moveCarouselTo(slide + 1, slide);
  }
};
const disableInteraction = () => {
  moving = true;
  setTimeout(() => {
    moving = false;
  }, 500);
};
const moveCarouselTo = (prevSlide: number, slide: number) => {
  if (!moving) {
    disableInteraction(); // Update the "old" adjacent slides with "new" ones
    prevSlide = wrap(prevSlide, 0, totalItems);
    let newPrevious = wrap(slide - 1, 0, totalItems);
    let newNext = wrap(slide + 1, 0, totalItems);
    let oldPrevious = wrap(prevSlide - 1, 0, totalItems);
    let oldNext = wrap(prevSlide + 1, 0, totalItems); // Test if carousel has more than three items
    if (totalItems - 1 > 3) {
      viewportSlides.value[oldPrevious].className = itemClassName;
      viewportSlides.value[oldNext].className = itemClassName; // Add new classes
      viewportSlides.value[prevSlide].className = itemClassName; // Add new classes
      viewportSlides.value[newPrevious].className = itemClassName + " prev";
      viewportSlides.value[slide].className = itemClassName + " active";
      viewportSlides.value[newNext].className = itemClassName + " next";
      paginationButtons.value[prevSlide].className = itemClassPaginationName;
      paginationButtons.value[
        slide
      ].className = `${itemClassPaginationName} ${itemClassPaginationName}--active`;
    }
  }
};
onMounted(() => {
  totalItems = viewportSlides.value.length;
  viewportSlides.value[totalItems - 1].classList.add("prev");
  viewportSlides.value[0].classList.add("active");
  viewportSlides.value[1].classList.add("next");
  paginationButtons.value[0].classList.add(
    "carousel__pagination-button--active"
  );
  moving = false;
});
</script>


<style lang="scss" scoped>
.carousel {
  width: 100%;
  height: 500px;
  background: var(--background-secondary);
  position: relative;
  margin: 3rem 0;
}

ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

.carousel__viewport {
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform-style: preserve-3d;
}

.carousel__slide {
  opacity: 0;
  position: absolute;
  top: 0;
  margin: auto;
  transition: translate 0.5s, rotate 0.5s, opacity 0.5s, z-index 0.5s;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;

  & > img {
    max-height: 100%;
    width: auto;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }

  &.initial,
  &.active {
    opacity: 1;
    position: relative;
    z-index: 900;
  }

  &.prev,
  &.next {
    z-index: 800;
  }
  &.prev {
    translate: -100% 0;
  }
  &.next {
    translate: 100% 0;
  }
}

$size: 50px;
.carousel__button {
  &--prev,
  &--next {
    position: absolute;
    top: 50%;
    width: $size;
    height: $size;
    background-color: var(--background-tertiary);
    border-radius: 50%;
    cursor: pointer;
    z-index: 1001;
    border: 5px solid var(--background-primary);
  }
  &--prev {
    left: 0;
    translate: -50% -50%;
  }
  &--next {
    right: 0;
    translate: 50% -50%;
  }
  &--prev::after,
  &--next::after {
    content: " ";
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    left: 54%;
    border-right: 2px solid var(--text-colour);
    border-bottom: 2px solid var(--text-colour);
    translate: -50% -50%;
    rotate: 135deg;
  }
  &--next::after {
    left: 47%;
    translate: -50% -50%;
    rotate: -45deg;
  }
}

.carousel__pagination {
  display: flex;
  justify-content: center;
  height: 10px;
}

.carousel__pagination-button {
  margin: 5px;
  width: 15px;
  height: 6px;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  background-color: var(--background-secondary);

  &--active {
    background-color: var(--text-colour);
  }
}
</style>