package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// EDIT THIS FILE!  THIS IS SCAFFOLDING FOR YOU TO OWN!
// NOTE: json tags are required.  Any new fields you add must have json tags for the fields to be serialized.

// TravellerSpec defines the desired state of Traveller
type TravellerSpec struct {
	// INSERT ADDITIONAL SPEC FIELDS - desired state of cluster
	// Important: Run "make" to regenerate code after modifying this file

	// Foo is an example field of Traveller. Edit traveller_types.go to remove/update
	Foo string `json:"foo,omitempty"`
}

// TravellerStatus defines the observed state of Traveller
type TravellerStatus struct {
	// INSERT ADDITIONAL STATUS FIELD - define observed state of cluster
	// Important: Run "make" to regenerate code after modifying this file
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

// Traveller is the Schema for the travellers API
type Traveller struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   TravellerSpec   `json:"spec,omitempty"`
	Status TravellerStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

// TravellerList contains a list of Traveller
type TravellerList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []Traveller `json:"items"`
}

func init() {
	SchemeBuilder.Register(&Traveller{}, &TravellerList{})
}
