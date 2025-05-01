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
  const dummy = new ListNode(0);
  dummy.next = head;
  
  let fast = dummy;
  let slow = dummy;
  
  // Move fast pointer n+1 steps ahead
  // The +1 is because we want slow to end up at the node BEFORE the one to remove
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
    
    // If fast is null before completing the loop, n is too large
    if (i < n && !fast) return head; // This is an edge case check
  }
  
  // Move both pointers until fast reaches the end
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  
  // Remove the nth node from the end
  slow.next = slow.next.next;
  
  // Return the new head
  return dummy.next;
};
