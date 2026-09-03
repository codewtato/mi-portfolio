interface Tecnologia {
    nombre: string;
    url: string;
}

interface CategoriaStack {
    titulo: string;
    descripcion: string;
    tecnologias: Tecnologia[];
}

const datosStack: CategoriaStack[] = [
    {
        titulo: 'Backend & Análisis de Datos',
        descripcion: 'Desarrollo de APIs robustas, modelado de bases de datos relacionales y no relacionales.',
        tecnologias: [
            { nombre: 'Java', url: 'https://img.shields.io/badge/java-%23ED8B00.svg?style=flat&logo=openjdk&logoColor=white' },
            { nombre: 'Spring', url: 'https://img.shields.io/badge/spring-%236DB33F.svg?style=flat&logo=spring&logoColor=white' },
            { nombre: 'Python', url: 'https://img.shields.io/badge/python-3670A0?style=flat&logo=python&logoColor=ffdd54' },
            { nombre: 'FastAPI', url: 'https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi' },
            { nombre: 'Node.js', url: 'https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white' },
            { nombre: 'R', url: 'https://img.shields.io/badge/r-%23276DC3.svg?style=flat&logo=r&logoColor=white' },
            { nombre: 'MySQL', url: 'https://img.shields.io/badge/mysql-%2300000f.svg?style=flat&logo=mysql&logoColor=white' },
            { nombre: 'MongoDB', url: 'https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white' }
        ]
    },
    {
        titulo: 'Frontend',
        descripcion: 'Creación de interfaces web modernas, responsivas e interactivas utilizando arquitecturas modulares y tipado estricto.',
        tecnologias: [
            { nombre: 'JavaScript', url: 'https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E' },
            { nombre: 'TypeScript', url: 'https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white' },
            { nombre: 'React', url: 'https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB' },
            { nombre: 'TailwindCSS', url: 'https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white' },
            { nombre: 'HTML5', url: 'https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white' },
            { nombre: 'Vite', url: 'https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white' },
            { nombre: 'CSS3', url: 'https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white' }
        ]
    },
    {
        titulo: 'Herramientas y Gestión',
        descripcion: 'Administración de entornos Linux, control de versiones fluido y trabajo bajo metodologías ágiles (Sprints) para entregas continuas.',
        tecnologias: [
            { nombre: 'Linux', url: 'https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black' },
            { nombre: 'Git', url: 'https://img.shields.io/badge/git-%23F05033.svg?style=flat&logo=git&logoColor=white' },
            { nombre: 'Bash', url: 'https://img.shields.io/badge/bash-%23121011.svg?style=flat&logo=gnu-bash&logoColor=white' },
            { nombre: 'Jira', url: 'https://img.shields.io/badge/jira-%230A0FFF.svg?style=flat&logo=jira&logoColor=white' },
            { nombre: 'Trello', url: 'https://img.shields.io/badge/Trello-%23026AA7.svg?style=flat&logo=Trello&logoColor=white' },
            { nombre: 'Scrum', url: 'https://img.shields.io/badge/Scrum-22A5F1?style=flat&logo=scrum&logoColor=white' }
        ]
    }
];

const contenedorPrincipal = document.getElementById('contenedor-cajas');

if (contenedorPrincipal) {
    datosStack.forEach(categoria => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-stack');

        const titulo = document.createElement('h3');
        titulo.textContent = categoria.titulo;
        tarjeta.appendChild(titulo);

        const descripcion = document.createElement('p');
        descripcion.textContent = categoria.descripcion;
        tarjeta.appendChild(descripcion);

        const contenedorPastillas = document.createElement('div');
        contenedorPastillas.classList.add('contenedor-pastillas');

        categoria.tecnologias.forEach(tech => {
            const img = document.createElement('img');
            img.src = tech.url;
            img.alt = tech.nombre;
            contenedorPastillas.appendChild(img);
        });

        tarjeta.appendChild(contenedorPastillas);
        contenedorPrincipal.appendChild(tarjeta);
    });
}