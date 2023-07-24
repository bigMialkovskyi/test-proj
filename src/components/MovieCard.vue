<template>
	<div class="card">
		<img class="poster" :src="`https://image.tmdb.org/t/p/w500` + `${poster_path}`" alt="poster">
		<div class="desc">
			<div class="vote">
				<p>{{ vote }}</p>
			</div>
			<p class="title">{{ title }}</p>
		</div>
		<p class="date">{{ release.slice(0, 4) }}</p>
	</div>
</template>
  
<script>
export default {
	name: 'MovieCard',
	props: {
		title: String,
		poster_path: String,
		vote: Number,
		release: String
	},
}
</script> 
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.desc {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1vw;
	position: relative;
	min-height: 10vw;
}

.date {
	margin: 1vh;
}

.card {
	position: static;
	width: 20vw;
	margin: 2vw;
	border-radius: 7px;
	border: 1px solid #e3e3e3;
	box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
	transition: .5s;

	img {
		width: 20vw;
		border-radius: 7px 7px 0 0;
	}
}

.title {
	margin-top: 2vh;
	font-size: 20px;
	width: 100%;
	font-weight: bold;
	text-align: right;
	color: black;
}

.card:hover {
	box-shadow: 7px 9px 15px rgba(0, 0, 0, .3);
}

.vote {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 5vw;
	height: 5vw;
	position: absolute;
	top: -2.5vw;
	left: 1vw;
	background-color: black;
	border: 3px solid rgb(0, 255, 0);
	border-radius: 50%;

	p {
		// margin: auto;
		font-size: 20px;
		font-weight: bold;
		color: #e3e3e3;
		user-select: none;
	}
}


@media screen and (max-width: 968px) {
	.vote {
		width: 5vw;
		height: 5vw;
		top: -2.5vw;

		p {
			font-size: 16px;
		}
	}
}


@media screen and (max-width: 767px) {

	.title {
		margin-top: 3vh;
		font-size: 18px;
	}

	.vote {
		width: 6vw;
		height: 6vw;
		top: -3vw;

		p {
			font-size: 14px;
		}
	}
}

@media screen and (max-width: 575px) {

	.title {
		margin-top: 3vh;
	}

	.vote {
		width: 8vw;
		height: 8vw;
		top: -4vw;

		p {
			font-size: 14px;
		}
	}


	.card {
		width: 40vw;

		img {
			width: 40vw;
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
  