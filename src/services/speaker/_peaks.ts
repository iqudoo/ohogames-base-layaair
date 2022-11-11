function getValueFromArray(data, index, paddleType) {
    if (index >= 0 && index < data.length) {
        return data[index];
    } else {
        switch (paddleType) {
            case "Zero":
                return 0;
            case "Repeat":
                return index < 0 ? data[0] : data[data.length - 1];
            case "Loop":
                var actualIndex = index;
                while (actualIndex < 0) {
                    actualIndex += data.length;
                }
                actualIndex %= data.length;
                return data[actualIndex];
            default:
                return 0;
        }
    }
}

function generateGaussianFilter(size, deviationSquare) {
    let result = [];
    let sum = 0;
    let mu = (size - 1) / 2;
    for (var i = 0; i < size; i++) {
        var param = -((i - mu) * (i - mu)) / (2 * deviationSquare);
        result[i] = Math.exp(param);
        sum += result[i];
    }
    for (var j = 0; j < size; j++) {
        result[j] /= sum;
    }
    return result;
}

function discreteCosineTransform(data) {
    let result = [];
    let sumCos = 0;
    data.forEach((_, i) => {
        sumCos = 0;
        data.forEach((d2, j) => {
            sumCos += d2 * Math.cos((Math.PI / data.length) * i * (j + 0.5))
        });
        result[i] = Math.abs(sumCos);
    });
    return result;
}

/**
 * Convolute data and filter. Result is sent to output, which must not be shorter than data.
 */
function convoluteDataAndFilter(data, filter, paddleType = "Repeat") {
    let output = [];
    let filterMiddlePoint = Math.floor(filter.length / 2);
    for (var n = 0; n < data.length; n++) {
        output[n] = 0.0;
        for (var m = 0; m < filter.length; m++) {
            output[n] += getValueFromArray(data, n - filterMiddlePoint + m, paddleType) * filter[filter.length - m - 1];
        }
    }
    return output;
}

function findLocalLargestPeaks(data, length) {
    let peakNum = 0;
    let lastPeak = 0;
    let lastPeakPositions = 0;
    let isIncreasing = false;
    let isPeakIncreasing = false;
    let peakValues = [];
    let peakPositions = [];
    for (var i = 0; i < data.length - 1; i++) {
        if (data[i] < data[i + 1]) {
            isIncreasing = true;
        } else {
            if (isIncreasing == true) {
                // Peak found.
                if (lastPeak < data[i]) {
                    isPeakIncreasing = true;
                }
                else {
                    if (isPeakIncreasing == true) {
                        // Local largest peak found.
                        peakValues[peakNum] = lastPeak;
                        peakPositions[peakNum] = lastPeakPositions;
                        ++peakNum;
                    }
                    isPeakIncreasing = false;
                }
                lastPeak = data[i];
                lastPeakPositions = i;
            }
            isIncreasing = false;
        }
        if (peakNum >= length) {
            break;
        }
    }
    return { peakValues, peakPositions }
}

export default {
    generateGaussianFilter,
    discreteCosineTransform,
    convoluteDataAndFilter,
    findLocalLargestPeaks
}