/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  // Nếu list rỗng hoặc chỉ có 1 node, không thể có cycle
  if (head === null || head.next === null) return false;

  let slow = head;
  let fast = head;

  // Tiếp tục lặp cho đến khi phát hiện cycle hoặc đến cuối list
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    // 2 khứa này gặp nhau nghĩa là đang trên cùng 1 node
    if (slow === fast) {
      return true;
    }
  }

  // Nếu fast hoặc fast.next là null, không có cycle
  return false;
};
