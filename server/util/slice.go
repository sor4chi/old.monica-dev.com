package util

func Contains(slice []int, i int) bool {
	for _, ele := range slice {
		if ele == i {
			return true
		}
	}
	return false
}
