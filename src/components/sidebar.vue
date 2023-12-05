<script setup>

</script>

<template>
  
  <div class="sidebar">
    <div class="project-card">
      <div class="details">

        <h1>Frontend Mentor</h1>
        <p>Feedback Board</p>
      </div>
    </div>
    <div class="tags-card">
      <div class="tags">
        <span class="tag active">All</span>
        <span class="tag">UI</span>
        <span class="tag">UX</span>
        <span class="tag">Enhancement</span>
        <span class="tag">Bug</span>
        <span class="tag">Feature</span>
      </div>
    </div>
    <div class="roadmap-card">

      <div class="roadmap-header">
        <h1>Roadmap</h1>
        <router-link to="/roadmap">View</router-link>
      </div>

      <div class="roadmap-body">
        <div class="col">
          <div>
            <span></span>
            <p>Planned</p>
          </div>
          <div>
            <p>2</p>
          </div>
        </div>
        <div class="col">
          <div>
            <span></span>
            <p>In-Progress</p>
          </div>
          <div>
            <p>3</p>
          </div>
        </div>
        <div class="col">
          <div>
            <span></span>
            <p>Live</p>
          </div>
          <div>
            <p>1</p>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>
<style>
.sidebar{
  margin-right: 20px;
  max-width: 255px;
}

.sidebar .project-card{
  background-image: url(/suggestions/desktop/background-header.png);
  width: 255px;
  height: 137px;
  color: var(--white);
  position: relative;
  border-radius: 10px;
}
.sidebar .tags-card{
  margin: 20px 0;
  min-height: 166px;
}
.sidebar .tags-card .tags{
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}
.sidebar .tags-card .tags .tag{
  min-width: 48px;
  text-align: center;
  background-color: var(--dark-gray);
  color: var(--dark-blue);
  font-weight: bold;
  font-size: 13px;
  border-radius: 10px;
  padding: 5px 15px;
  margin: 5px;
}
.sidebar .tags-card .tags .tag:hover{
  cursor: pointer;
  background-color: #CFD7FF;
}
.sidebar .tags-card .tags .tag.active{
  background-color: var(--dark-blue);
  color: var(--white);
}
.sidebar .project-card .details{
  position: absolute;
  bottom: 20px;
  left: 20px;
}
.sidebar .roadmap-card{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  
}
.sidebar .roadmap-card .roadmap-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.sidebar .roadmap-card .roadmap-header a{color: var(--dark-blue);font-weight: 600;}
.sidebar .roadmap-card .roadmap-header a:hover{text-decoration: underline;color: var(--dark-blue-hvr);}
.sidebar .roadmap-card .roadmap-body .col{
  display: flex;
  justify-content: space-between;
}
.sidebar .roadmap-card .roadmap-body .col>div>span{
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.sidebar .roadmap-card .roadmap-body > div.col:nth-child(1) > div,
.sidebar .roadmap-card .roadmap-body > div.col:nth-child(2) > div,
.sidebar .roadmap-card .roadmap-body > div.col:nth-child(3) > div{display: flex; align-items: center;}

.sidebar .roadmap-card .roadmap-body > div.col > div > span{margin-right: 10px;}

.sidebar .roadmap-card .roadmap-body > div.col:nth-child(1) > div:nth-child(1) > span{
  background-color: var(--orang);
}
.sidebar .roadmap-card .roadmap-body > div.col:nth-child(2) > div:nth-child(1) > span{
  background-color: var(--primary);
}
.sidebar .roadmap-card .roadmap-body > div.col:nth-child(3) > div:nth-child(1) > span{
  background-color: var(--light-blue);
}
.sidebar > div.roadmap-card > div.roadmap-body > div > div:nth-child(2) > p{
  font-weight: bold;
}
</style>