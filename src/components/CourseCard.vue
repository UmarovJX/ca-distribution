<script setup>
defineProps({
  vertical: { type: Boolean, default: false },
  img: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  progress: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="course-card">
    <div
      :class="{
        image_container__vertical: vertical,
        image_container__horizontal: !vertical
      }"
    >
      <img :src="img" :alt="title" />
      <div class="course-progress" v-if="progress">
        <div></div>
        <div class="card-svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
            <path
              d="M7.5 5V7.5L9.0625 9.0625"
              stroke="#FC8D2D"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.50259 3.50259L3.14903 3.14903H3.14903L3.50259 3.50259ZM2.7111 4.29408L2.21111 4.29659C2.21248 4.57077 2.43441 4.79269 2.70859 4.79407L2.7111 4.29408ZM4.29956 4.80206C4.5757 4.80345 4.80068 4.58072 4.80206 4.30458C4.80345 4.02844 4.58072 3.80346 4.30458 3.80208L4.29956 4.80206ZM3.2031 2.70059C3.20171 2.42445 2.97673 2.20172 2.70059 2.20311C2.42445 2.2045 2.20172 2.42948 2.20311 2.70562L3.2031 2.70059ZM2.42259 6.74482C2.46009 6.47123 2.26871 6.21905 1.99512 6.18155C1.72154 6.14405 1.46935 6.33543 1.43185 6.60902L2.42259 6.74482ZM11.811 3.18901C9.41138 0.789396 5.53327 0.764798 3.14903 3.14903L3.85614 3.85614C5.84317 1.86911 9.08808 1.88031 11.1039 3.89612L11.811 3.18901ZM3.18901 11.811C5.58862 14.2106 9.46673 14.2352 11.851 11.851L11.1439 11.1439C9.15683 13.1309 5.91192 13.1197 3.89612 11.1039L3.18901 11.811ZM11.851 11.851C14.2352 9.46673 14.2106 5.58862 11.811 3.18901L11.1039 3.89612C13.1197 5.91192 13.1309 9.15683 11.1439 11.1439L11.851 11.851ZM3.14903 3.14903L2.35755 3.94052L3.06465 4.64763L3.85614 3.85614L3.14903 3.14903ZM2.70859 4.79407L4.29956 4.80206L4.30458 3.80208L2.71361 3.79408L2.70859 4.79407ZM3.21109 4.29156L3.2031 2.70059L2.20311 2.70562L2.21111 4.29659L3.21109 4.29156ZM1.43185 6.60902C1.17968 8.44879 1.76695 10.3889 3.18901 11.811L3.89612 11.1039C2.70291 9.91068 2.21139 8.28567 2.42259 6.74482L1.43185 6.60902Z"
              fill="#FC8D2D"
            />
          </svg>
        </div>

        <span>{{ progress + '%' }}</span>
        <div></div>
      </div>
    </div>

    <h2 class="card-title">{{ title }}</h2>
    <p class="card-description">{{ description }}</p>
  </div>
</template>

<style>
.card-svg {
  width: 14px;
  height: 14px;
}
.course-progress {
  font-size: 12px;
  border-radius: 10px;
  background-color: white;
  position: absolute;
  top: 20px;
  left: 20px;
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.course-progress span {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.165px;
}
.course-card {
  width: 250px;
}
.image_container__horizontal {
  width: 250px;
  height: 145px;
  border-radius: 30px;
  overflow: hidden;
  margin-bottom: 15px;
}
.image_container__vertical {
  width: 250px;
  height: 310px;
  border-radius: 30px;
  overflow: hidden;
  margin-bottom: 15px;
}

.image_container__horizontal img {
  width: 250px;
  aspect-ratio: auto;
  border-radius: 30px;
}

.image_container__vertical img {
  height: 310px;
  aspect-ratio: auto;
  border-radius: 30px;
}
.card-title {
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.165px;
  padding-bottom: 10px;
}
.card-description {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  margin-left: 20px;
}
.card-description::before {
  position: absolute;
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #fc8d2d;
  left: -20px;
  top: 2px;
}
</style>
