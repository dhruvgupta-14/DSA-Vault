module.exports = [
  {
    title: "Binary Search",
    category: "Searching",
    time: "O(log n)",
    space: "O(1)",
    tags: ["search", "arrays"],
    code: "int binarySearch(vector<int>& arr, int target) {\n    int lo = 0, hi = (int)arr.size() - 1;\n    while (lo <= hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1; // not found\n}",
    notes: "Classic iterative binary search on a sorted array. Adapt the comparison for lower_bound / upper_bound style variants."
  },
  {
    title: "Two Pointers (sorted array)",
    category: "Arrays",
    time: "O(n)",
    space: "O(1)",
    tags: ["two-pointer", "arrays"],
    code: "bool twoSumSorted(vector<int>& arr, int target) {\n    int left = 0, right = (int)arr.size() - 1;\n    while (left < right) {\n        int sum = arr[left] + arr[right];\n        if (sum == target) return true;\n        else if (sum < target) left++;\n        else right--;\n    }\n    return false;\n}",
    notes: "Move pointers inward based on comparison to target. Works for pair-sum, container-with-most-water style problems."
  },
  {
    title: "Sliding Window (variable size)",
    category: "Arrays",
    time: "O(n)",
    space: "O(1)",
    tags: ["sliding-window", "arrays"],
    code: "int longestSubarrayAtMostK(vector<int>& arr, int k) {\n    int left = 0, sum = 0, best = 0;\n    for (int right = 0; right < (int)arr.size(); right++) {\n        sum += arr[right];\n        while (sum > k) {\n            sum -= arr[left];\n            left++;\n        }\n        best = max(best, right - left + 1);\n    }\n    return best;\n}",
    notes: "Shrink the window from the left whenever the constraint is violated. Swap the condition for max-sum / distinct-count variants."
  },
  {
    title: "DFS (adjacency list)",
    category: "Graphs",
    time: "O(V+E)",
    space: "O(V)",
    tags: ["graph", "dfs"],
    code: "void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {\n    visited[node] = true;\n    // process(node);\n    for (int next : adj[node]) {\n        if (!visited[next]) dfs(next, adj, visited);\n    }\n}",
    notes: "Recursive DFS. For large graphs, convert to an explicit stack to avoid recursion depth issues."
  },
  {
    title: "BFS (shortest path, unweighted)",
    category: "Graphs",
    time: "O(V+E)",
    space: "O(V)",
    tags: ["graph", "bfs", "shortest-path"],
    code: "vector<int> bfs(int start, vector<vector<int>>& adj, int n) {\n    vector<int> dist(n, -1);\n    queue<int> q;\n    dist[start] = 0;\n    q.push(start);\n    while (!q.empty()) {\n        int node = q.front(); q.pop();\n        for (int next : adj[node]) {\n            if (dist[next] == -1) {\n                dist[next] = dist[node] + 1;\n                q.push(next);\n            }\n        }\n    }\n    return dist;\n}",
    notes: "dist[i] == -1 means unreachable. Works only when all edge weights are equal (1)."
  },
  {
    title: "Union-Find (DSU)",
    category: "Data Structures",
    time: "O(a(n))",
    space: "O(n)",
    tags: ["dsu", "union-find", "graph"],
    code: "struct DSU {\n    vector<int> parent, rnk;\n    DSU(int n) : parent(n), rnk(n, 0) {\n        iota(parent.begin(), parent.end(), 0);\n    }\n    int find(int x) {\n        if (parent[x] != x) parent[x] = find(parent[x]);\n        return parent[x];\n    }\n    bool unite(int a, int b) {\n        a = find(a); b = find(b);\n        if (a == b) return false;\n        if (rnk[a] < rnk[b]) swap(a, b);\n        parent[b] = a;\n        if (rnk[a] == rnk[b]) rnk[a]++;\n        return true;\n    }\n};",
    notes: "Path compression + union by rank. Near-constant time per operation. Great for Kruskal's MST and connectivity queries."
  },
  {
    title: "Dijkstra (shortest path)",
    category: "Graphs",
    time: "O(E log V)",
    space: "O(V)",
    tags: ["graph", "dijkstra", "shortest-path"],
    code: "vector<long long> dijkstra(int start, int n, vector<vector<pair<int,int>>>& adj) {\n    vector<long long> dist(n, LLONG_MAX);\n    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;\n    dist[start] = 0;\n    pq.push({0, start});\n    while (!pq.empty()) {\n        auto [d, node] = pq.top(); pq.pop();\n        if (d > dist[node]) continue;\n        for (auto [next, w] : adj[node]) {\n            if (dist[node] + w < dist[next]) {\n                dist[next] = dist[node] + w;\n                pq.push({dist[next], next});\n            }\n        }\n    }\n    return dist;\n}",
    notes: "adj[node] holds (neighbor, weight) pairs. Requires non-negative weights. Uses a min-heap via greater<>."
  },
  {
    title: "Kadane's Algorithm",
    category: "Dynamic Programming",
    time: "O(n)",
    space: "O(1)",
    tags: ["dp", "subarray"],
    code: "int maxSubArray(vector<int>& nums) {\n    int best = nums[0], cur = nums[0];\n    for (int i = 1; i < (int)nums.size(); i++) {\n        cur = max(nums[i], cur + nums[i]);\n        best = max(best, cur);\n    }\n    return best;\n}",
    notes: "Maximum sum contiguous subarray. cur decides whether to extend the previous run or restart at the current element."
  },
  {
    title: "0/1 Knapsack",
    category: "Dynamic Programming",
    time: "O(n*W)",
    space: "O(n*W)",
    tags: ["dp", "knapsack"],
    code: "int knapsack(vector<int>& wt, vector<int>& val, int W) {\n    int n = wt.size();\n    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));\n    for (int i = 1; i <= n; i++) {\n        for (int w = 0; w <= W; w++) {\n            dp[i][w] = dp[i - 1][w];\n            if (wt[i - 1] <= w)\n                dp[i][w] = max(dp[i][w], dp[i - 1][w - wt[i - 1]] + val[i - 1]);\n        }\n    }\n    return dp[n][W];\n}",
    notes: "Can be compressed to a 1D array (iterate w from W down to wt[i-1]) to cut space to O(W)."
  },
  {
    title: "Longest Increasing Subsequence",
    category: "Dynamic Programming",
    time: "O(n log n)",
    space: "O(n)",
    tags: ["dp", "lis", "binary-search"],
    code: "int lengthOfLIS(vector<int>& nums) {\n    vector<int> tails;\n    for (int x : nums) {\n        auto it = lower_bound(tails.begin(), tails.end(), x);\n        if (it == tails.end()) tails.push_back(x);\n        else *it = x;\n    }\n    return (int)tails.size();\n}",
    notes: "tails is not the actual subsequence, only tracks the smallest tail for each length. Use strictly < vs <= to control strict/non-strict."
  },
  {
    title: "Backtracking (subsets)",
    category: "Backtracking",
    time: "O(2^n)",
    space: "O(n)",
    tags: ["backtracking", "subsets", "recursion"],
    code: "void backtrack(int idx, vector<int>& nums, vector<int>& path, vector<vector<int>>& result) {\n    result.push_back(path); // record current subset\n    for (int i = idx; i < (int)nums.size(); i++) {\n        path.push_back(nums[i]);\n        backtrack(i + 1, nums, path, result);\n        path.pop_back();\n    }\n}",
    notes: "General include/exclude recursion skeleton. Swap the base case and loop bounds to adapt for permutations, combinations, or N-Queens."
  },
  {
    title: "Trie (insert & search)",
    category: "Data Structures",
    time: "O(L) per op",
    space: "O(N*L)",
    tags: ["trie", "strings"],
    code: "struct TrieNode {\n    TrieNode* child[26] = {};\n    bool isEnd = false;\n};\n\nstruct Trie {\n    TrieNode* root = new TrieNode();\n    void insert(const string& word) {\n        TrieNode* cur = root;\n        for (char c : word) {\n            int i = c - 'a';\n            if (!cur->child[i]) cur->child[i] = new TrieNode();\n            cur = cur->child[i];\n        }\n        cur->isEnd = true;\n    }\n    bool search(const string& word) {\n        TrieNode* cur = root;\n        for (char c : word) {\n            int i = c - 'a';\n            if (!cur->child[i]) return false;\n            cur = cur->child[i];\n        }\n        return cur->isEnd;\n    }\n};",
    notes: "Assumes lowercase a-z. Add a startsWith() by dropping the isEnd check at the end of the traversal."
  },
  {
    title: "Segment Tree (sum, point update)",
    category: "Data Structures",
    time: "O(log n) per op",
    space: "O(n)",
    tags: ["segment-tree", "range-query"],
    code: "struct SegTree {\n    int n;\n    vector<long long> tree;\n    SegTree(int n_) : n(n_), tree(4 * n_, 0) {}\n    void update(int node, int start, int end, int idx, int val) {\n        if (start == end) { tree[node] = val; return; }\n        int mid = (start + end) / 2;\n        if (idx <= mid) update(2*node, start, mid, idx, val);\n        else update(2*node+1, mid+1, end, idx, val);\n        tree[node] = tree[2*node] + tree[2*node+1];\n    }\n    long long query(int node, int start, int end, int l, int r) {\n        if (r < start || end < l) return 0;\n        if (l <= start && end <= r) return tree[node];\n        int mid = (start + end) / 2;\n        return query(2*node, start, mid, l, r) + query(2*node+1, mid+1, end, l, r);\n    }\n};",
    notes: "Call update(1, 0, n-1, idx, val) and query(1, 0, n-1, l, r) from outside. Swap sum for min/max/gcd as needed."
  },
  {
    title: "Topological Sort (Kahn's)",
    category: "Graphs",
    time: "O(V+E)",
    space: "O(V)",
    tags: ["graph", "topo-sort"],
    code: "vector<int> topoSort(int n, vector<vector<int>>& adj) {\n    vector<int> indegree(n, 0);\n    for (int u = 0; u < n; u++)\n        for (int v : adj[u]) indegree[v]++;\n\n    queue<int> q;\n    for (int i = 0; i < n; i++) if (indegree[i] == 0) q.push(i);\n\n    vector<int> order;\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        order.push_back(u);\n        for (int v : adj[u]) {\n            if (--indegree[v] == 0) q.push(v);\n        }\n    }\n    return order;\n}",
    notes: "If order.size() < n, the graph has a cycle and no valid topological order exists."
  },
  {
    title: "Fast I/O Boilerplate",
    category: "Misc",
    time: "-",
    space: "-",
    tags: ["boilerplate", "io"],
    code: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int t;\n    cin >> t;\n    while (t--) {\n        // solve()\n    }\n\n    return 0;\n}",
    notes: "Standard competitive-programming starting point with fast I/O and a multi-testcase loop."
  }
];
