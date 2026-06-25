// =============================================================================
// DOM EVENTS FUNDAMENTALS
// =============================================================================
//
// Events are how the browser notifies JavaScript that something happened.
//
// Examples:
//
// - Mouse clicked
// - Key pressed
// - Input changed
// - Form submitted
// - Window resized
//
// There are TWO completely separate class hierarchies involved:
//
// 1. EventTarget hierarchy
//    (Who receives an event?)
//
// 2. Event hierarchy
//    (What happened?)
//
// Don't confuse these two.

// =============================================================================
// 1. EVENTTARGET HIERARCHY (Receivers)
// =============================================================================
//
// EventTarget
// │
// ├── Window
// │
// └── Node
//      │
//      ├── Document
//      ├── Element
//      │      │
//      │      └── HTMLElement
//      │             │
//      │             ├── HTMLButtonElement
//      │             ├── HTMLInputElement
//      │             ├── HTMLDivElement
//      │             └── ...
//      │
//      ├── Text
//      └── ...
//
// Every EventTarget can:
//
// ✔ addEventListener()
// ✔ removeEventListener()
// ✔ dispatchEvent()
//
// Examples:
//
// window.addEventListener(...)
// document.addEventListener(...)
// button.addEventListener(...)

// =============================================================================
// 2. EVENT HIERARCHY (What happened?)
// =============================================================================
//
// Event
// │
// ├── UIEvent
// │      │
// │      ├── MouseEvent
// │      ├── KeyboardEvent
// │      ├── FocusEvent
// │      ├── WheelEvent
// │      └── ...
// │
// ├── InputEvent
// ├── SubmitEvent
// ├── ClipboardEvent
// ├── DragEvent
// ├── PointerEvent
// └── ...
//
// These classes describe WHAT happened.
//
// Mouse click
// Keyboard press
// Form submit
// Input typing
// etc.

// =============================================================================
// 3. Relationship between Event and EventTarget
// =============================================================================
//
// They DO NOT inherit from each other.
//
// Instead:
//
// Event
//      │
//      │ dispatched to
//      ▼
// EventTarget
//
// Think:
//
// "An Event is sent TO an EventTarget."
//
// Example:
//
// MouseEvent
//      │
//      ▼
// HTMLButtonElement
//
// The browser creates the MouseEvent object,
// then dispatches it to the button.

// =============================================================================
// 4. addEventListener()
// =============================================================================
//
// Syntax:
//
// target.addEventListener(type, callback);
//
// Example:
//
// const button = document.querySelector("button");
//
// button.addEventListener("click", callback);
//
// Meaning:
//
// "Whenever a click event is dispatched to this button,
// execute callback."

const button = document.querySelector("button");

button.addEventListener("click", function (event) {
  console.log(event);
});

//
// event:
//
// MouseEvent {
//     type: "click",
//     bubbles: true,
//     target: ...
//     currentTarget: ...
//     ...
// }

// =============================================================================
// 5. Event object
// =============================================================================
//
// The browser creates this object.
//
// You DO NOT create it.
//
// Browser:
//
// Mouse click
//
// ↓
//
// Creates:
//
// MouseEvent
//
// ↓
//
// Passes it to your callback.
//

button.addEventListener("click", function (event) {
  console.log(event.constructor.name);
  // "MouseEvent"
});

// =============================================================================
// 6. EventTarget vs Event
// =============================================================================
//
// DON'T MIX THESE.
//
// EventTarget
//
// "Who received the event?"
//
// Examples:
//
// window
// document
// button
// input
//
//
//
// Event
//
// "What happened?"
//
// Examples:
//
// MouseEvent
// KeyboardEvent
// SubmitEvent
// InputEvent

// =============================================================================
// 7. event.target
// =============================================================================
//
// target:
//
// "Where did the event ORIGINALLY happen?"
//
// Example:
//
// <div id="outer">
//      <button id="btn">Click</button>
// </div>
//
// Click the button.
//

outer.addEventListener("click", (event) => {
  console.log(event.target);
});

//
// Output:
//
// <button id="btn">
//
// because the click originated there.

// =============================================================================
// 8. event.currentTarget
// =============================================================================
//
// currentTarget:
//
// "Which object is CURRENTLY running this listener?"
//
// Example:

outer.addEventListener("click", (event) => {
  console.log(event.currentTarget);
});

//
// Output:
//
// <div id="outer">
//
// because the listener belongs to the div.

// =============================================================================
// 9. Event Bubbling
// =============================================================================
//
// HTML:
//
// <body>
//     <div>
//         <button>
//         </button>
//     </div>
// </body>
//
//
// Click button:
//
// button
//    ↑
// div
//    ↑
// body
//    ↑
// html
//    ↑
// document
//    ↑
// window
//
// The SAME Event object travels upward.
//
// This process is called:
//
// Event Bubbling.

window.addEventListener("click", () => {
  console.log("window");
});

document.addEventListener("click", () => {
  console.log("document");
});

outer.addEventListener("click", () => {
  console.log("outer");
});

button.addEventListener("click", () => {
  console.log("button");
});

//
// Clicking the button prints:
//
// button
// outer
// document
// window
//
// (body/html would appear too if listeners existed there.)

// =============================================================================
// 10. target vs currentTarget
// =============================================================================
//
// HTML:
//
// <div>
//      <button>
//      </button>
// </div>
//
// Listener attached to DIV.
//

outer.addEventListener("click", (event) => {
  console.log(event.target);

  console.log(event.currentTarget);
});

//
// Click button.
//
// target:
//
// <button>
//
// currentTarget:
//
// <div>
//
//
// target
//
// "Where did the event START?"
//
//
// currentTarget
//
// "Whose callback is running RIGHT NOW?"
//
//
// During bubbling:
//
// target NEVER changes.
//
// currentTarget changes at every listener.

// =============================================================================
// 11. preventDefault()
// =============================================================================
//
// Many browser events have a default action.
//
// Examples:
//
// Clicking a link
// → Navigate
//
// Submitting a form
// → Reload page
//
// preventDefault()
// cancels that default behavior.
//

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

//
// Used constantly in React:
//
// onSubmit={(e) => e.preventDefault()}

// =============================================================================
// 12. stopPropagation()
// =============================================================================
//
// Normally events bubble upward.
//
// stopPropagation()
//
// stops the event from continuing.
//

button.addEventListener("click", (event) => {
  event.stopPropagation();
});

//
// Now:
//
// button
//
// is reached.
//
// But:
//
// div
// document
// window
//
// never receive the event.

// =============================================================================
// 13. dispatchEvent()
// =============================================================================
//
// Events don't have to come from the user.
//
// You can create one yourself.
//

const custom = new Event("hello");

button.dispatchEvent(custom);

//
// dispatchEvent()
//
// literally sends an Event object
// to an EventTarget.

// =============================================================================
// 14. React Connection
// =============================================================================
//
// React's:
//
// onClick
//
// is built on top of:
//
// addEventListener("click")
//
//
//
// React:
//
// <button
//     onClick={(e) => {
//         console.log(e.target);
//     }}
// />
//
// is conceptually similar to:
//
// button.addEventListener("click", (event) => {
//
// });

// =============================================================================
// Mental Model
// =============================================================================
//
//                    EVENT OBJECTS
//                  (What happened?)
//
//                     Event
//                        │
//        ┌───────────────┼────────────────┐
//        ▼               ▼                ▼
//   MouseEvent     SubmitEvent     KeyboardEvent
//                        │
//                        │ dispatched to
//                        ▼
//
//                  EVENT TARGETS
//                 (Who receives it?)
//
//                  EventTarget
//                       │
//          ┌────────────┴────────────┐
//          ▼                         ▼
//      Window                     Node
//                                     │
//                              ┌──────┴──────┐
//                              ▼             ▼
//                         Document      HTMLButtonElement
//
//
// Remember:
//
// Event
//     describes WHAT happened.
//
// EventTarget
//     receives the Event.
//
// They are DIFFERENT class hierarchies.
