function dijkstra(graph, start) {
  // Initialize distances object with infinity for all vertices except the starting vertex
  const distances = {};
  for (const vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0; // Starting vertex has a distance of 0

  // Priority queue for vertices and their distances
  const priorityQueue = new Map();
  priorityQueue.set(start, 0);

  // Visited set to track which vertices have been processed
  const visited = new Set();

  // While there are vertices in the priority queue
  while (priorityQueue.size > 0) {
    // Find the vertex with the smallest distance from the starting vertex
    let [currentVertex, currentDistance] = [...priorityQueue.entries()].reduce(
      (min, [vertex, distance]) => {
        if (distance < min[1]) {
          return [vertex, distance];
        }
        return min;
      },
      [null, Infinity]
    );

    // Remove the current vertex from the priority queue
    priorityQueue.delete(currentVertex);

    // If the vertex has already been visited, continue to the next iteration
    if (visited.has(currentVertex)) {
      continue;
    }

    // Mark the current vertex as visited
    visited.add(currentVertex);

    // Iterate over the neighbors of the current vertex
    for (const neighbor in graph[currentVertex]) {
      const weight = graph[currentVertex][neighbor];
      const newDistance = currentDistance + weight;

      // Update the distance to the neighbor if a shorter path is found
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        // Add or update the neighbor in the priority queue
        priorityQueue.set(neighbor, newDistance);
      }
    }
  }

  // Return the shortest distances from the starting vertex to all other vertices
  return distances;
}

// Example usage
const graph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 5, D: 10 },
  C: { A: 2, B: 5, D: 3 },
  D: { B: 10, C: 3 },
};
