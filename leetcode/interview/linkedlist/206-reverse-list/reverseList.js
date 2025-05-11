// Actual implementation of ListNode class
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
};

// PHẦN DƯỚI ĐỂ CHẠY DEBUG
// Create a sample linked list for testing
function createSampleList() {
  const n1 = new ListNode(1);
  const n2 = new ListNode(2);
  const n3 = new ListNode(3);
  const n4 = new ListNode(4);
  const n5 = new ListNode(5);

  n1.next = n2;
  n2.next = n3;
  n3.next = n4;
  n4.next = n5;

  return n1; // Return head
}

// Helper function to print the list
function printList(head) {
  let current = head;
  const values = [];
  while (current !== null) {
    values.push(current.val);
    current = current.next;
  }
  console.log(values.join(" -> "));
}

// Create and test
const head = createSampleList();
console.log("Original list:");
printList(head);
const reversedHead = reverseList(head);
console.log("After operation:");
printList(reversedHead);
