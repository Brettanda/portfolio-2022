<template>
  <section class="carousel">
    <div class="carousel__viewport" ref="viewportparent">
      <!-- <ContentSlot :use="$slots.default" unwrap="ul"/> -->
      <ol
        class="carousel__viewport-sub"
        ref="viewport"
      >
        <!-- :style="`--item-length: ${flatUnwrap($slots.default!(), ['ul']).length}`" -->
        <li
          v-for="(item, index) of flatUnwrap($slots.default!(), ['ul'])"
          ref="viewportSlides"
          :key="index"
          :class="`carousel__slide`"
          @dragstart.prevent
          @touchstart="touchStart(index, $event)"
          @touchend="touchEnd"
          @touchmove="touchMove"
          @mousedown="touchStart(index, $event)"
          @mouseup="touchEnd"
          @mousemove="touchMove"
          @mouseleave="touchEnd"
        >
          <!-- :class="`carousel__slide ${index === 0 ? 'active' : ''}`" -->
          <ContentSlot :use="() => item" unwrap="li" />
        </li>
      </ol>
    </div>
    <button
      class="carousel__button--next"
      type="button"
      @click="slideNext"
      aria-label="Move to next carousel item"
    ></button>
    <button
      class="carousel__button--prev"
      type="button"
      @click="slidePrev"
      aria-label="Move to previous carousel item"
    ></button>
    <ol class="carousel__pagination" ref="pagination">
      <!-- <li
        v-for="(item, index) of flatUnwrap($slots.default!(), ['ul'])"
        :key="index"
        class="carousel__pagination-item"
      >
        <button
          class="carousel__pagination-button"
          ref="paginationButtons"
          type="button"
          :aria-label="`Navigate to slide ${index + 1}`"
          @click="slideTo(index)"
        ></button>
      </li> -->
    </ol>
  </section>
</template>

<script setup lang="ts">
// https://codepen.io/bushblade/pen/ZEpvzbK
import { ref } from "vue";
const { flatUnwrap } = useUnwrap();

const viewportSlides = ref<HTMLLIElement[]>([]);
// @ts-ignore
const viewport: Ref<HTMLOListElement> = ref<HTMLOListElement>();
// @ts-ignore
const viewportparent: Ref<HTMLDivElement> = ref<HTMLDivElement>();
const paginationButtons = ref<HTMLButtonElement[]>([]);
let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID: number,
  currentIndex = 0;

// const wrap = (num: number, min: number, max: number): number =>
//   ((((num - min) % (max - min)) + (max - min)) % (max - min)) + min;

const range = (num: number, min: number, max: number): number =>
  Math.min(max-1, Math.max(min, num));

const getPositionX = (event: any) => {
  const num = event.type.includes("mouse")
    ? event.pageX
    : event.touches[0].clientX;
  return num;
};

const slidePrev = () => {
  slideTo(currentIndex - 1);
};
const slideNext = () => {
  slideTo(currentIndex + 1);
};
const slideTo = (index: number) => {
  paginationButtons.value[currentIndex].classList.remove(
    "carousel__pagination-button--active"
  );
  currentIndex = range(index, 0, viewportSlides.value.length);
  paginationButtons.value[currentIndex].classList.add(
    "carousel__pagination-button--active"
  );
  setPositionByIndex();
};

const touchStart = (index: number, event: TouchEvent | MouseEvent) => {
  currentIndex = index;
  startPos = getPositionX(event);
  isDragging = true;
  animationID = requestAnimationFrame(animation);
  viewport.value.classList.add("grabbing");
  return event;
};
const touchMove = (event: TouchEvent | MouseEvent) => {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
  return event;
};
const touchEnd = (event: TouchEvent | MouseEvent) => {
  cancelAnimationFrame(animationID);
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;
  paginationButtons.value[currentIndex].classList.remove(
    "carousel__pagination-button--active"
  );

  // if moved enough negative then snap to next slide if there is one
  if (movedBy < -100 && currentIndex < viewportSlides.value.length - 1)
    currentIndex += 1;

  // if moved enough positive then snap to previous slide if there is one
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();
  paginationButtons.value[currentIndex].classList.add(
    "carousel__pagination-button--active"
  );

  viewport.value.classList.remove("grabbing");
  return event;
};

const animation = () => {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
};
const setPositionByIndex = () => {
  currentTranslate = currentIndex * -viewportparent.value.offsetWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
};

const setSliderPosition = () => {
  viewport.value.style.transform = `translateX(${currentTranslate}px)`;
};

onMounted(() => {
  // console.log(flatUnwrap(useSlots().default, ['p']))
  
  window.addEventListener("resize", setPositionByIndex);
  paginationButtons.value[0].classList.add(
    "carousel__pagination-button--active"
  );
});
</script>


<style lang="scss">
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
  position: relative;
}

.carousel__viewport-sub {
  width: calc(100% * var(--item-length, 10));
  height: 100%;
  display: inline-flex;
  will-change: transform;
  transition: transform 0.3s ease-out;
  cursor: grab;
}

.carousel__slide {
  width: inherit;
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

  & > .image {
    max-height: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    user-select: none;
  }
}

.grabbing {
  cursor: grabbing;
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
  height: 12px;
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