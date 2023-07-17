const URL = "./data.json";

async function onLoad(url) {
  let res = await fetch(url);
  let data = await res.json();
  return data;
}

let currentView = "daily";

class InfoItem {
 
  


  constructor(data, container = ".container", view = currentView) {
    this.data = data;
    this.container = document.querySelector(container);
    this.view = view;
    this.period= {daily:"day",
    weekly:"week",
    monthly:"month",
}
    this._createItem();
  }

  changeView() {
    this.view = document.querySelector(".period_active").id;
    const { title, timeframes } = this.data;
    const { current, previous } = timeframes[this.view];

    const block = document.querySelector(
      `.${title.toLowerCase().replace(" ", "-")}`
    );

    block.querySelector(".item-content__result").textContent = `${current}hrs`;
    block.querySelector(
      ".item-content__previos"
    ).textContent = `Last ${this.period[this.view]} - ${previous}hrs`;
  }

  _createItem() {
    const { title, timeframes } = this.data;
    const { current, previous } = timeframes[this.view];
    
    this.container.insertAdjacentHTML(
      "beforeend",
      `  
    <div class='item  ${title.toLowerCase().replace(" ", "-")}'>
    <div class="item-content">
     <p class="item-content__title">${title}</p>
     <div class="item-content__ellipsis"> <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
          fill="#BBC0FF"
          fill-rule="evenodd"
        />
      </svg>
     </div>
      <p class="item-content__result">${current}hrs</p>
      <p class="item-content__previos">Last ${this.period[this.view]}  - ${previous}hrs</p>          
    </div>
  </div> `
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  onLoad(URL).then((dt) => {
    const activities = dt.map((el) => new InfoItem(el));

    const periodsChouse = document.querySelectorAll(".period");
    periodsChouse.forEach((period) => {
      period.addEventListener("click", () => {
        document
          .querySelector(".period_active")
          .classList.remove("period_active");
        period.classList.add("period_active");
        activities.forEach((activity) => activity.changeView());
      });
    });
  });
});
