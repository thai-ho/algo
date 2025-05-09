/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  // Xử lý trường hợp đặc biệt: danh sách rỗng hoặc chỉ có 1 node
  if (!head || !head.next) return true;

  // Bước 1: Tìm điểm giữa của danh sách
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Bước 2: Đảo ngược nửa sau của danh sách
  let prev = null;
  let current = slow;
  let next = null;

  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  // Bước 3: So sánh nửa đầu với nửa sau đã đảo ngược
  let firstHalfPtr = head;
  let secondHalfPtr = prev;

  while (secondHalfPtr) {
    if (firstHalfPtr.val !== secondHalfPtr.val) {
      return false;
    }

    firstHalfPtr = firstHalfPtr.next;
    secondHalfPtr = secondHalfPtr.next;
  }

  return true;
};
