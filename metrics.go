package main

import (
	"net/http"
	"time"

	"github.com/prometheus/client_golang/prometheus"
)

var httpRequestsTotal = prometheus.NewCounterVec(prometheus.CounterOpts{
	Name: "http_requests_total",
	Help: "Count of all HTTP requests",
}, []string{"method"})

var httpRequestsDuration = prometheus.NewHistogramVec(
	prometheus.HistogramOpts{
		Name:    "http_request_duration_seconds",
		Help:    "A histogram of latencies for requests.",
		Buckets: []float64{.005, .01, .025, .05, 0.1, 0.25, 0.5, 1},
	},
	[]string{"method", "path"},
)

var registry = initRegistry()

func initRegistry() *prometheus.Registry {
	r := prometheus.NewRegistry()
	r.MustRegister(httpRequestsTotal)
	r.MustRegister(httpRequestsDuration)

	return r
}

func InstrumentHandler(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		httpRequestsTotal.With(prometheus.Labels{"method": r.Method}).Inc()
		httpRequestsDuration.With(prometheus.Labels{"path": r.URL.Path, "method": r.Method}).Observe(time.Since(start).Seconds())
	}
}
