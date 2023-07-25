<template>
	<div>
		<h1 class="title">Posters</h1>
		<ul v-if="list.length" class="list">
			<li v-if="actor.file_path" v-for="actor in list" :key="actor.file_path">
				<div class="card">
					<img class="poster" :src="`https://image.tmdb.org/t/p/w500` + `${actor.file_path}`" alt="poster">
				</div>
			</li>
		</ul>
	</div>
</template>
    
<script>
// копмонент використовується на сторінці з детальною інформацією про фільм
// рендерить список постерів доступних для фільму
// аргументом від компонента предка приймає масив постерів
export default {
	name: 'Gallery',
	props: {
		list: Array
	},
}
</script> 
    
<style scoped lang="scss">
.list {
	display: flex;
	overflow: auto;
}

.card {
	position: static;
	width: 10vw;
	margin: 2vh 1vw 2vh 1vw;
	border-radius: 7px;
	border: 1px solid #e3e3e3;
	box-shadow: 7px 9px 15px rgba(0, 0, 0, .3);
	transition: .5s;

	img {
		width: 10vw;
		border-radius: 7px;
	}
}

.title {
	text-align: left;
	font-weight: 600;
	font-size: 1.4em;
	margin: 2vh 2vw;
	box-sizing: border-box;
}

@media screen and (max-width: 968px) {
	.card {
		width: 15vw;

		img {
			width: 15vw;
		}
	}
}

@media screen and (max-width: 575px) {
	.card {
		width: 25vw;

		img {
			width: 25vw;
		}
	}
}

h3 {
	margin: 40px 0 0;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}
</style>
    