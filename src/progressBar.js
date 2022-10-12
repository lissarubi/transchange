const progressBar = (currentStep, totalSteps, clearScreenEvery = 1, barLength = 50) => {
    const progressBarStyle = { pending: ' ', complete: '=' }

    if (currentStep % clearScreenEvery === 0) { console.clear() }

    currentStep++

    let progress = Math.round(currentStep * barLength * 1.0 / totalSteps)
    let percent = (currentStep * 100.0 / totalSteps).toFixed(2)

    console.log(`[${progressBarStyle.complete.repeat(progress)}${progressBarStyle.pending.repeat(barLength - progress)}] ${percent} %`)

    if (currentStep === totalSteps) {
        console.log("Repositorios atualizados!")
    }

    return currentStep
}


module.exports.progressBar = progressBar