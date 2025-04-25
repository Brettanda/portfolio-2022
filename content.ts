import { visit } from 'unist-util-visit'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', (file) => {
    console.log("FUCK!!!!!!!!!!!!!!!!");
    if (file._id.endsWith('.md')) {
      let imagesArray = [];
      let previousNodeIsImage = false;

      visit(file.body, (node, index, parent) => {
        if (node.type === 'element' && node.tagName === 'img') {
          if (previousNodeIsImage) {
            imagesArray[imagesArray.length - 1].push(node.properties.src);
          } else {
            imagesArray.push([node.properties.src]);
          }
          previousNodeIsImage = true;
        } else {
          previousNodeIsImage = false;
        }

        if (index === parent.children.length - 1 && imagesArray.length > 0) {
          parent.children.push({
            type: 'element',
            tagName: 'Imagegrid',
            properties: {
              images: imagesArray,
            },
          });
          imagesArray = [];
        }
      });
    }
  });
});
