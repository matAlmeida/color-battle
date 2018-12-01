export const getGraph = id => {
  const mainGraph = [
    {
      label: 1,
      pos: [5, 0],
      links: [2, 6, 7, 9]
    },
    {
      label: 2,
      pos: [9, 0],
      links: [3, 9]
    },
    {
      label: 3,
      pos: [9, 4],
      links: [4, 9]
    },
    {
      label: 4,
      pos: [6, 7],
      links: [5, 8]
    },
    {
      label: 5,
      pos: [2, 5],
      links: [6, 7, 8]
    },
    {
      label: 6,
      pos: [0, 1],
      links: [7]
    },
    {
      label: 7,
      pos: [2, 3],
      links: [8]
    },
    {
      label: 8,
      pos: [5, 5],
      links: [9]
    },
    {
      label: 9,
      pos: [7, 2],
      links: []
    }
  ];

  return mainGraph;
};

/**
 *
 * @param {array} graph
 * @returns {object} object with the links
 */
export const getLinks = graph => {
  const links = graph.reduce((agg, node) => {
    const datLinks = node.links.reduce(
      (agg2, link) => {
        agg2[node.label] = [...agg2[node.label], link];
        agg2[link] = [...agg2[link], node.label];

        return agg2;
      },
      { ...agg }
    );

    return datLinks;
  }, {});

  return links;
};
