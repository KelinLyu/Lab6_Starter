// RecipeCard.js

class RecipeCard extends HTMLElement {
  // Called once when document.createElement('recipe-card') is called, or
  // the element is written into the DOM directly as <recipe-card>
  constructor() {
    super(); // Inheret everything from HTMLElement

    // EXPOSE - START (All expose numbers start with A)

    // A1. Attach the shadow DOM to this Web Component (leave the mode open)
    const shadow = this.attachShadow({ mode: "open" });

    // A2. Create an <article> element - This will hold our markup once our data is set
    const article_element = document.createElement("article");

    // A3. TODO - Create a style element - This will hold all of the styles for the Web Component
    const style_element = document.createElement("style");

    // A4. TODO - Insert all of the styles from cardTemplate.html into the <style> element you just made
    style_element.textContent = `
    * {
      font-family: sans-serif;
      margin: 0;
      padding: 0;
    }

    a {
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    article {
      align-items: center;
      border: 1px solid rgb(223, 225, 229);
      border-radius: 8px;
      display: grid;
      grid-template-rows: 118px 56px 14px 18px 15px 36px;
      height: auto;
      row-gap: 5px;
      padding: 0 16px 16px 16px;
      width: 178px;
    }

    div.rating {
      align-items: center;
      column-gap: 5px;
      display: flex;
    }

    div.rating>img {
      height: auto;
      display: inline-block;
      object-fit: scale-down;
      width: 78px;
    }

    article>img {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      height: 118px;
      object-fit: cover;
      margin-left: -16px;
      width: calc(100% + 32px);
    }

    p.ingredients {
      height: 32px;
      line-height: 16px;
      padding-top: 4px;
      overflow: hidden;
    }

    p.organization {
      color: black !important;
    }

    p.title {
      display: -webkit-box;
      font-size: 16px;
      height: 36px;
      line-height: 18px;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    p:not(.title),
    span,
    time {
      color: #70757A;
      font-size: 12px;
    }
    `;

    // A5. TODO - Append the <style> and <article> elements to the Shadow DOM
    shadow.appendChild(style_element);
    shadow.appendChild(article_element);
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For Example:
   * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
   * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
   *
   * @param {Object} data - The data to pass into the <recipe-card>, must be of the
   *                        following format:
   *                        {
   *                          "imgSrc": "string",
   *                          "imgAlt": "string",
   *                          "titleLnk": "string",
   *                          "titleTxt": "string",
   *                          "organization": "string",
   *                          "rating": number,
   *                          "numRatings": number,
   *                          "lengthTime": "string",
   *                          "ingredients": "string"
   *                        }
   */
  set data(data) {
    // If nothing was passed in, return
    if (!data) return;

    // A6. Select the <article> we added to the Shadow DOM in the constructor
    const article_element = this.shadowRoot.querySelector("article");

    // A7. Set the contents of the <article> with the <article> template given in
    //           cardTemplate.html and the data passed in (You should only have one <article>,
    //           do not nest an <article> inside another <article>). You should use Template
    //           literals (tempalte strings) and element.innerHTML for this.
    const image_element = document.createElement("img");
    image_element.setAttribute("src", data["imgSrc"]);
    image_element.setAttribute("alt", data["imgAlt"]);
    article_element.appendChild(image_element);

    const title_p_element = document.createElement("p");
    title_p_element.setAttribute("class", "title");
    article_element.appendChild(title_p_element);

    const title_a_element = document.createElement("a");
    title_a_element.setAttribute("href", data["titleLnk"]);
    title_a_element.textContent = data["titleTxt"];
    title_p_element.appendChild(title_a_element);

    const organization_element = document.createElement("p");
    organization_element.setAttribute("class", "organization");
    organization_element.textContent = data["organization"];
    article_element.appendChild(organization_element);

    const div_element = document.createElement("div");
    div_element.setAttribute("class", "rating");
    article_element.appendChild(div_element);

    const top_span_element = document.createElement("span");
    top_span_element.textContent = "" + data["rating"];
    div_element.appendChild(top_span_element);

    const middle_image_element = document.createElement("img");
    middle_image_element.setAttribute("src", "./assets/images/icons/" + data["rating"] + "-star.svg");
    middle_image_element.setAttribute("alt", "" + data["rating"] + " stars");
    div_element.appendChild(middle_image_element);

    const bot_span_element = document.createElement("span");
    bot_span_element.textContent = "(" + data["numRatings"] + ")";
    div_element.appendChild(bot_span_element);

    const time_element = document.createElement("time");
    time_element.textContent = "" + data["lengthTime"] + " min";
    article_element.appendChild(time_element);

    const ingredients_element = document.createElement("p");
    ingredients_element.setAttribute("class", "ingredients");
    ingredients_element.textContent = data["ingredients"];
    article_element.appendChild(ingredients_element);

  }
}

// A8. Define the Class as a customElement so that you can create
//           'recipe-card' elements
customElements.define("recipe-card", RecipeCard);
