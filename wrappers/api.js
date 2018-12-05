import { basic1, basic2, basic3, basic4 } from "./graphs";

export const getGraph = (id = 1) => {
  switch (id) {
    case 1:
      return basic1;
    case 2:
      return basic2;
    case 3:
      return basic3;
    case 4:
      return basic4;
    default:
      return [];
  }
};

export const getLinks = graph => {
  const links = graph.reduce((agg, node) => {
    node.links.map(link => {
      if (agg[node.label]) {
        agg[node.label] = [...agg[node.label], link];
        if (agg[link]) {
          agg[link] = [...agg[link], node.label];
        } else {
          agg[link] = [node.label];
        }
      } else {
        agg[node.label] = [link];
        if (agg[link]) {
          agg[link] = [...agg[link], node.label];
        } else {
          agg[link] = [node.label];
        }
      }
    });

    return { ...agg };
  }, {});

  return links;
};
