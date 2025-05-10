import react from "react";

const services = [
  {
    titulo: 'Maquinado',
    elementos: {
      S1: 'Moldes de inyección de plástico y partes de repuesto',
      S2: 'Moldes de termo formado',
      S3: 'Troqueles',
      S4: 'Estaciones de trabajo (Automatización)',
      S5: 'Dados de Suaje y sellado por radio frecuencia',
      S6: 'Fixturas',
      S7: 'Soldadura',
      S8: 'Die Casting (operaciones secundarias)'
    },
  },
  {
    titulo: 'Manufactura',
    elementos: {
      S1: 'Optimización de procesos de maquinado',
      S2: 'Programación 3, 4 y 5 Ejes',
      S3: 'Diseño de herramientas especiales',
      S4: 'Ingeniería Inversa',
    },
  },
  {
    titulo: 'Mantenimiento Preventivo y Correctivo',
    elementos: {
      S1: 'Moldes de inyección',
      S2: 'Troqueles',
      S3: 'Dados de Suaje y de sellado por radio frecuencia.',
      S4: 'Moldes de termo formado',
    },
  },
  {
    titulo: 'Entrenamiento',
    elementos: {
      S1: 'Capacitación para el uso de maquinaría CNC; Fresadora de 3 a 5 Ejes, Torno, EDM, Wire EDM, Laser, Plasma. Fundamentos básicos de seguridad y operación.',
      S2: 'Operación de maquinaria CNC y programación a pie de máquina.',
      S3: 'Programación CNC (Mastercam 2018)',
    },
  },
];

const Services = () => {
  return (
    <section className="px-6 py-12">
    <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>

    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 container mx-auto">
    {services.map((service, index) => (
          <div
            key={index}
            className="p-6 border rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-4">{service.titulo}</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {Object.entries(service.elementos).map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}
            </ul>
          </div>
        ))} 
    </div>
  </section>
  );
};

export default Services;
