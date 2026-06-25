// =============================================================================
// DOM FUNDAMENTALS
// =============================================================================
//
// The browser parses HTML into JavaScript objects.
//
// These objects are connected together to form the DOM (Document Object Model).
//
// There are TWO different trees to understand:
//
// 1. CLASS HIERARCHY (Inheritance)
//    Describes WHAT TYPE an object is.
//
// 2. DOM TREE
//    Describes HOW the objects are connected together.
//
// Don't confuse these two!
//

// =============================================================================
// 0. INHERITANCE vs OWNERSHIP (VERY IMPORTANT)
// =============================================================================
//
// There are TWO completely different relationships in the browser.
//
// -----------------------------------------------------------------------------
// A) Inheritance ("is-a")
// -----------------------------------------------------------------------------
//
// This is the CLASS HIERARCHY.
//
// Example:
//
// HTMLDivElement
//      ↓
// HTMLElement
//      ↓
// Element
//      ↓
// Node
//      ↓
// EventTarget
//
// Read this as:
//
// HTMLDivElement IS AN HTMLElement.
// HTMLElement IS AN Element.
// Element IS A Node.
//
//
// -----------------------------------------------------------------------------
// B) Ownership / Composition ("has-a")
// -----------------------------------------------------------------------------
//
// This is NOT inheritance.
//
// Window
// │
// ├── document
// ├── location
// ├── history
// ├── navigator
// ├── localStorage
// ├── sessionStorage
// ├── fetch()
// ├── alert()
// └── setTimeout()
//
// Window HAS A Document.
//
// Document does NOT inherit from Window.
// Window does NOT inherit from Document.
//
// They simply reference each other.
//
// The browser exposes many Window properties globally.
//
// Therefore:
//
// window.document === document        // true
// window.alert === alert              // true
// window.setTimeout === setTimeout    // true
//
// The reverse relationship also exists:
//
// document.defaultView === window     // true
//
// Remember:
//
// "has-a"  !=  "is-a"
//
// Window HAS A Document.
// Document IS A Node.

// =============================================================================
// 1. CLASS HIERARCHY (Inheritance)
// =============================================================================
//
// EventTarget
// │
// ├── Window
// │
// └── Node
//      │
//      ├── Document
//      │      │
//      │      └── HTMLDocument (browser implementation)
//      │
//      ├── Element
//      │      │
//      │      ├── HTMLElement
//      │      │      │
//      │      │      ├── HTMLDivElement
//      │      │      ├── HTMLInputElement
//      │      │      ├── HTMLButtonElement
//      │      │      ├── HTMLFormElement
//      │      │      ├── HTMLParagraphElement
//      │      │      ├── HTMLHeadingElement
//      │      │      └── ...
//      │      │
//      │      ├── SVGElement
//      │      └── MathMLElement
//      │
//      ├── Text
//      ├── Comment
//      ├── DocumentFragment
//      ├── DocumentType
//      └── ... (other specialized Node types)
//
// Important:
//
// ✔ Every Element is a Node.
// ✔ Every Document is a Node.
// ✔ Every Text node is a Node.
// ✔ Every Comment is a Node.
//
// But:
//
// ✘ Document is NOT an Element.
// ✘ Text is NOT an Element.
// ✘ Comment is NOT an Element.
//
// They are siblings under Node.
//
// Window is NOT a Node.
// It is a separate branch under EventTarget.

// =============================================================================
// 2. DOM TREE
// =============================================================================
//
// Generated from the HTML.
//
// Every object inside the DOM tree is a Node.
//
// Example HTML:
//
// <!doctype html>
// <html>
//   <head>
//     <title>DOM Practice</title>
//   </head>
//
//   <body>
//     <!-- Main container -->
//
//     <div id="container">
//       <h1>Hello DOM</h1>
//
//       <p>
//         Learning
//         <strong>DOM</strong>
//         is fun!
//       </p>
//
//       <button>Click Me</button>
//
//       <input type="text" value="Hi">
//     </div>
//   </body>
// </html>
//
//
// DOM Tree:
//
// Document (HTMLDocument)
// │
// └── html (HTMLHtmlElement)
//      │
//      ├── head (HTMLHeadElement)
//      │    │
//      │    └── title (HTMLTitleElement)
//      │          │
//      │          └── Text("DOM Practice")
//      │
//      └── body (HTMLBodyElement)
//           │
//           ├── Comment(" Main container ")
//           │
//           └── div#container (HTMLDivElement)
//                │
//                ├── h1 (HTMLHeadingElement)
//                │    │
//                │    └── Text("Hello DOM")
//                │
//                ├── p (HTMLParagraphElement)
//                │    │
//                │    ├── Text("Learning")
//                │    ├── strong (HTMLElement)
//                │    │      │
//                │    │      └── Text("DOM")
//                │    └── Text("is fun!")
//                │
//                ├── button (HTMLButtonElement)
//                │      │
//                │      └── Text("Click Me")
//                │
//                └── input (HTMLInputElement)
//
// Notice:
//
// Text is its own Node.
// Comments are their own Nodes.
// They are NOT Elements.
//
// The DOM tree contains INSTANCES (objects).
//
// The class hierarchy describes the TYPES of those objects.

// =============================================================================
// 3. JavaScript runtime types vs TypeScript types
// =============================================================================

class Dog {}

const d = new Dog();

console.log(typeof d);
// "object"
//
// JavaScript's typeof is very coarse.
//
// Arrays       -> object
// Dates        -> object
// DOM Elements -> object
// Your classes -> object

console.log(d.constructor.name);
// "Dog"
//
// constructor.name tells you the runtime class.
//
// TypeScript reasons about these classes,
// not the result of typeof.

// =============================================================================
// 4. instanceof (Inheritance checks)
// =============================================================================

const div = document.createElement("div");

console.log(div instanceof HTMLDivElement); // true
console.log(div instanceof HTMLElement); // true
console.log(div instanceof Element); // true
console.log(div instanceof Node); // true
console.log(div instanceof EventTarget); // true

console.log(document instanceof Document); // true
console.log(document instanceof Node); // true
console.log(document instanceof Element); // false

console.log(window instanceof EventTarget); // true

// =============================================================================
// 5. Understanding document
// =============================================================================

console.log(document.constructor.name);
// "HTMLDocument"

console.log(document.documentElement.constructor.name);
// "HTMLHtmlElement"

console.log(document.head.constructor.name);
// "HTMLHeadElement"

console.log(document.body.constructor.name);
// "HTMLBodyElement"

//
// document represents the ENTIRE webpage.
//
// document.documentElement -> <html>
// document.head            -> <head>
// document.body            -> <body>
//

// =============================================================================
// 5.5 Window <-> Document relationship
// =============================================================================

console.log(window.document === document);
// true

console.log(document.defaultView === window);
// true

console.log(window.window === window);
// true

console.log(window.constructor.name);
// "Window"

console.log(document.constructor.name);
// "HTMLDocument"

// =============================================================================
// 6. Node APIs vs Element APIs
// =============================================================================
//
// Node APIs work with:
//
// - Elements
// - Text
// - Comments
// - Document
//
// Element APIs work ONLY with Elements.
//

const container = document.getElementById("container");

// -----------------------------------------------------------------------------
// Node APIs
// -----------------------------------------------------------------------------

console.log(container.childNodes);
//
// NodeList(9)
//
// [
//   #text,
//   <h1>,
//   #text,
//   <p>,
//   #text,
//   <button>,
//   #text,
//   <input>,
//   #text
// ]
//
// childNodes contains ALL child Nodes.
// This includes Text, Comments and Elements.

console.log(container.firstChild);
//
// #text
//
// (Usually the newline/indentation before <h1>)

console.log(container.lastChild);
//
// #text
//
// (Usually the newline after <input>)

console.log(container.parentNode);
//
// <body>...</body>
//
// constructor.name:
// "HTMLBodyElement"

// -----------------------------------------------------------------------------
// Element APIs
// -----------------------------------------------------------------------------

console.log(container.children);
//
// HTMLCollection(4)
//
// [
//   <h1>,
//   <p>,
//   <button>,
//   <input>
// ]
//
// children only contains Elements.
//
// No Text nodes.
// No Comment nodes.

console.log(container.firstElementChild);
//
// <h1>Hello DOM</h1>
//
// constructor.name:
// "HTMLHeadingElement"

console.log(container.lastElementChild);
//
// <input type="text" value="Hi">
//
// constructor.name:
// "HTMLInputElement"

console.log(container.parentElement);
//
// <body>...</body>
//
// constructor.name:
// "HTMLBodyElement"

// =============================================================================
// 7. Observe the difference
// =============================================================================

console.log(container.firstChild.constructor.name);
// "Text"

console.log(container.firstElementChild.constructor.name);
// "HTMLHeadingElement"

// =============================================================================
// 8. Inspect everything
// =============================================================================

console.log(container);
//
// Chrome renders DOM elements using an HTML-like view
// for readability.
//
// This is still a JavaScript object.

console.dir(container);
//
// Displays the actual HTMLDivElement object.
//
// Useful for exploring:
//
// - properties
// - methods
// - prototype chain

console.log(container.constructor.name);
// "HTMLDivElement"
