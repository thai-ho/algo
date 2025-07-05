import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Thai's Algorithm Collection",
  description: "LeetCode solutions, algorithms, and formulas",

  // Make sure VitePress can access your existing files
  srcDir: ".",

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Algorithms", link: "/algorithms/" },
    ],

    sidebar: {
      "/algorithms/": [
        {
          text: "Array Problems",
          items: [
            {
              text: "Find Lucky Integer",
              link: "/leetcode/daily/1394-find-lucky-integer-in-array/guide",
            },
          ],
        },
      ],
    },
  },
});
