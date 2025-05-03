/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

var removeNthFromEnd = function (head, n) {
  // Init listnode
  const dummy = new ListNode(0);
  dummy.next = head;
  
  let fast = dummy;
  let slow = dummy;
  
  // Move fast to n, +1 để move tới node có khoảng cách so với slow bằng n
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
    
    // case này để ràng buộc n === null => end của list
    // hoặc n quá lớn, lớn hơn list length thì return head
    if (i < n && !fast) return head; // This is an edge case check
  }
  
  // chạy fast và slow
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  
  // fast dừng, xoá node tiếp theo của slow
  slow.next = slow.next.next;
  
  // Return head mới
  return dummy.next;
};
