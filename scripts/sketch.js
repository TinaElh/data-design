let categories = {
  1: {
    name: "Film and Animation",
    color: "#E22371",
    videos: [],
    totalViews: 0,
  },
  2: {
    name: "Autos and Vehicles",
    color: "#FAB17F",
    videos: [],
    totalViews: 0,
  },
  10: {
    name: "Music",
    color: "#F493A6",
    videos: [],
    totalViews: 0,
  },
  15: {
    name: "Pets and Animals",
    color: "#B67CB6",
    videos: [],
    totalViews: 0,
  },
  17: {
    name: "Sports",
    color: "#F16159",
    videos: [],
    totalViews: 0,
  },
  19: {
    name: "Travel and Events",
    color: "#B9B560",
    videos: [],
    totalViews: 0,
  },
  20: {
    name: "Gaming",
    color: "#ED815A",
    videos: [],
    totalViews: 0,
  },
  22: {
    name: "People and Blogs",
    color: "#B2C883",
    videos: [],
    totalViews: 0,
  },
  23: {
    name: "Comedy",
    color: "#FDC6C9",
    videos: [],
    totalViews: 0,
  },
  24: {
    name: "Entertainment",
    color: "#754499",
    videos: [],
    totalViews: 0,
  },
  25: {
    name: "News and Politics",
    color: "#F7BD4B",
    videos: [],
    totalViews: 0,
  },
  26: {
    name: "HowTo and Style",
    color: "#BFCFAF",
    videos: [],
    totalViews: 0,
  },
  27: {
    name: "Education",
    color: "#2369B1",
    videos: [],
    totalViews: 0,
  },
  28: {
    name: "Science and Technology",
    color: "#2C2E81",
    videos: [],
    totalViews: 0,
  },
  29: {
    name: "NonProfits and Activism",
    color: "#F7DBAB",
    videos: [],
    totalViews: 0,
  },
};
let overlapping = false;
let protection = 0;

function preload() {
  data = loadTable("fr_yt_data.csv", "ssv", "header");
}

function setup() {
  console.log(categories);
  console.log(data);
  createCanvas(1000, 1000);

  for (let i = 0; i < data.getRowCount(); i++) {
    let video = data.rows[i].arr;
    categories[video[5]].videos.push(video);
    categories[video[5]].totalViews += parseInt(video[8]);
  }

  let sortable = [];
  for (const categoryId in categories) {
    sortable.push([categoryId, categories[categoryId].totalViews]);
  }
  sortable.sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < 5; i++) {
      getCircles(categories[sortable[i][0]].videos, width-i*200, height-i*200);
  }
}

function getCircles(videos, width, height) {
  let circles = [];

  videos.forEach((video) => {
    protection = 0;
    let circle = {};
    
    do {
      circle = {
        x: random(width),
        y: random(height),
        r: (video[8] + 1) / 5000000, // nb views
        color: categories[video[5]].color, // category
      };

      overlapping = false;
      
      for (let j = 0; j < circles.length; j++) {
        let otherCircle = circles[j];
        let d = dist(circle.x, circle.y, otherCircle.x, otherCircle.y);
        if (d < circle.r + otherCircle.r) {
          overlapping = true;
          break;
        } else {
          overlapping = false;
        }
      }
      
      protection++;
      if (protection > 500) {
        break;
      }
    } while (overlapping);

    circles.push(circle);

  });
  
  drawCircles(circles);
}

function drawCircles(circles) {
  for (let i = 0; i < circles.length; i++) {
    fill(circles[i].color); // color = category
    noStroke();
    circle(circles[i].x, circles[i].y, circles[i].r * 2);
  }
}

function draw() {}