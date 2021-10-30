const AUTOMATA = {
  q0: {
    entrada_posible: ["g"],
    estado_siguiente: ["q1"],
  },
  q1: {
    entrada_posible: ["u", "m"],
    estado_siguiente: ["q7", "q2"],
  },
  q2: {
    entrada_posible: ["m"],
    estado_siguiente: ["q3"],
  },
  q3: {
    final: true,
    entrada_posible: ["u", "m"],
    estado_siguiente: ["q4", "q2"],
  },
  q4: {
    entrada_posible: ["m"],
    estado_siguiente: ["q5"],
  },
  q5: {
    entrada_posible: ["g"],
    estado_siguiente: ["q6"],
  },
  q6: {
    final: true,
  },
  q7: {
    entrada_posible: ["m"],
    estado_siguiente: ["q8"],
  },
  q8: {
    entrada_posible: ["g"],
    estado_siguiente: ["q9"],
  },
  q9: {
    final: true,
    entrada_posible: ["u"],
    estado_siguiente: ["q10"],
  },
  q10: {
    entrada_posible: ["u"],
    estado_siguiente: ["q9"],
  },
}

export default AUTOMATA
