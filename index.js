$(function() {
	document.querySelector("#answer_field").addEventListener("keyup", event => {
		if (event.key !== "Enter") {return}
		document.getElementById("correct_answer").style.visibility == "visible" ? document.querySelector("#next_btn").click() : document.querySelector("#answer_btn").click()
		event.preventDefault()
	})
})

function changeQuestion() {
	document.getElementById("answer_field").value = ""
	document.getElementById("answer_field").focus()

	let p_one = document.getElementById("character")
	let p_two = document.getElementById("equivalent")
	let a = document.getElementById("correct_answer")

	let questionShape = shapeQuestion([document.getElementById('h').checked, document.getElementById('k').checked, document.getElementById('r').checked])
	if (!questionShape) {return false} // No question can be found if two boxes are left unchecked

	a.style.visibility = "hidden"

	$.getJSON("characters.json", function(data) {
		const characters = data.items[Math.floor(Math.random() * data.items.length)]
		var part_one
		var part_two
		var answer

		switch (questionShape[1]) {
			case "h":
				part_one = characters.h
				break
			case "k":
				part_one = characters.k
				break
			case "r":
				part_one = characters.r
				break
			default:
				part_one = "???"
		}

		switch (questionShape[0]) {
			case "h":
				part_two = "hiragana"
				answer = characters.h
				break
			case "k":
				part_two = "katakana"
				answer = characters.k
				break
			case "r":
				part_two = "romaji"
				answer = characters.r
				break
			default:
				part_two = "???"
		}

		p_one.innerHTML = part_one
		p_two.innerHTML = part_two
		a.getElementsByTagName('p')[0].innerHTML = `The answer was ${answer}`

	})
}

function shapeQuestion(allow) {
	if (allow.filter(Boolean).length < 2) {return false} // No question can be found if two boxes are left unchecked

	let possibilities = ['h', 'k', 'r']
	var element_one
	var element_two

	while (element_one == undefined) {
		let x = Math.floor(Math.random() * possibilities.length)
		if (allow[x]) {
			let temp = possibilities[x]
			allow.splice(possibilities.indexOf(temp), 1)
			possibilities.splice(possibilities.indexOf(temp), 1)
			element_one = temp
		}
	}

	while (element_two == undefined) {
		let x = Math.floor(Math.random() * possibilities.length)
		if (allow[x] && possibilities[x] != element_one) {element_two = possibilities[x]}
	}

	return [element_one, element_two]
}

function checkAnswer() {
	let answer_field = document.getElementById("answer_field")
	let correct_answer_p = document.getElementById("correct_answer").getElementsByTagName('p')[0]
	let positive = document.getElementById("score").getElementsByTagName('p')[1]
	let negative = document.getElementById("score").getElementsByTagName('p')[0]

	if (answer_field.value == correct_answer_p.innerHTML.slice(correct_answer_p.innerHTML.lastIndexOf(" ") + 1)) {
		positive.innerHTML = Number(positive.innerHTML) + 1
	} else {
		negative.innerHTML = Number(negative.innerHTML) + 1
	}

	correct_answer.style.visibility = "visible"
}
