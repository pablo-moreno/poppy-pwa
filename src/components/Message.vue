<template>
  <li class="message" :class="{'mine': mine, 'yours': !mine}">
    <span class="message-title">{{ message.user.username }}</span>
    <p class="message-content">
      {{ message.text }}
    </p>
    <div class="message-date">
      {{ date | format }}
    </div>
  </li>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    message: {
      type: Object,
      required: true,
    }
  },
  computed: {
    mine() {
      return this.message.user.id === this.$store.state.auth.user.id
    },
    date() {
      return new Date(parseInt(this.message.creationDate))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/utils/_colors.scss';
@import url('https://fonts.googleapis.com/css?family=Source+Code+Pro');

.container {
	padding: 10px;
	display: flex;
	flex-direction: column;
	background-color: #D0D0D0;
	list-style: none;
}

.message-date {
	font-size: .85em;
	font-weight: 300;
}

.message {
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 10px;
	min-width: 200px;
	max-width: 680px;
	margin: .5rem 1rem;
	
	&-title {
		cursor: pointer;
		font-weight: bold;
		&:hover{
			text-decoration: underline;
		}
	}
	
	&-info {
		display: flex;
	}
}

.yours {
	align-self: flex-start;
	background-color: white;;
	box-shadow: 2px 2px 4px #A8A8A8;
	text-align: left;
	border: 1px solid white;
	border-radius: 10px;
	
	&:after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-top: 15px solid white;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		top: 0;
		left: -15px;
	}

	&:before {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-top: 17px solid transparent;
		border-left: 16px solid transparent;
		border-right: 16px solid transparent;
		top: -1px;
		left: -17px;
	}
	
	.message-date {
		align-self: flex-end;
	}
}

.mine {
	background-color: $primary;
	text-align: left;
	border: 0px solid #ABABAB;
	border-radius: 10px;
	align-self: flex-end;
	box-shadow: -2px -2px 4px #A8A8A8;
	color: white;
	
	&:after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-bottom: 15px solid $primary;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		bottom: 0;
		right: -15px;
	}
	
	&:before {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-bottom: 17px solid transparent;
		border-left: 16px solid transparent;
		border-right: 16px solid transparent;
		bottom: -1px;
		right: -17px;
	}

	& > .message-title {
		color: black;
	}
}

.message-content {
	padding-bottom: 1em;
	margin: 0;
}

</style>
