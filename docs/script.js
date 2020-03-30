window.addEventListener( 'load', async () => {

	const base = `https://sergej-kucharev.github.io/cn-2020`;
	let groups = [
		'group-ka71.json',
	];


	groups = groups.map( async ( groupFile ) => {
		const response = await fetch( 
			`${ base }/${ groupFile }`,
			// {
			// 	method: 'GET',
			// 	cache: 'no-cache',
			// 	credentials: 'same-origin', // include, *same-origin, omit
			// 	redirect: 'follow', // manual, *follow, error
			// 	referrerPolicy: 'no-referrer', // no-referrer, *client
			// }
		);
		return await response.json();
	} );
	groups = await Promise.all( groups );


	groups = groups.map( ( groupData ) => {
		const { class: className, group, title: titleName, students, } = groupData;

		const section = document.createElement( "<section>" );
		section.classList.add( "group", className );

		const title = $( "<h2>" );
		title.textContent = titleName;
		section.appendChild( title );

		for ( const studentName of students ) {
			const student = $( "<h3>" );
			student.textContent = studentName;
			section.appendChild( student );

			const labs = $( "<ol>" );
			section.appendChild( labs );

			for ( const labName of [ "lab1", "lab2", "lab3", "lab4", "lab5" ] ) {
				const lab = $( "<li>" );
				labs.appendChild( lab );

				const link = $( "<a>" );
				link.setAttribute( "href", `${ base }/tree/master/${ group }/${ studentName }/${ labName }` );
				link.setAttribute( "target", "_blank" );
				lab.appendChild( link );
			}
		}

		return section;
	} );

	const main = document.getElemntById( 'main' );
	for ( const group of groups ) {
		main.appendChild( group );
	}

} );
