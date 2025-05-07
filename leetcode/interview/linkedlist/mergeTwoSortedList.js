/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    // Create a dummy head to simplify the merging process
    const dummyHead = new ListNode(-1);
    let current = dummyHead;
    
    // Traverse both lists and compare values
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    // Attach the remaining nodes from either list
    // Only one of these will execute
    if (list1 !== null) {
        current.next = list1;
    } else {
        current.next = list2;
    }
    
    // Return the merged list (skip the dummy head)
    return dummyHead.next;
};
