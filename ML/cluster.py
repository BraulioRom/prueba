#!/usr/bin/env python2
# -*- coding: utf-8 -*-
import pandas as pd
import numpy as np
def init():
    dataset = pd.read_csv('/Users/braulinho/Desktop/PT/Machine/perfiles_c.csv')
    X = dataset.iloc[:, 1:27].values

    # Feature Scaling
    from sklearn.preprocessing import StandardScaler
    sc = StandardScaler()
    X_new = sc.fit_transform(X)
    
    from sklearn.cluster import KMeans
    kmeans = KMeans(n_clusters=6, random_state=0).fit(X)
    
    
    
    
    
    labels=kmeans.labels_
    vector = np.array([[0.745139,1.92708,-0.89518,-0.611192,-0.629974,-0.603983,-0.583825,-0.615521,-0.67365,-0.715052,-0.586704,-0.596781,-0.527613,-0.810152,-0.553599,-0.73154,-0.576631,-0.618408,-0.542064,-0.567997,-0.591022,-0.526165,-0.483881,-0.440677,-0.461684,-0.565118]])
    resp=kmeans.predict(vector)

    import pickle
    modelo = pickle.dumps(kmeans)

    cargado = pickle.loads(modelo)
    
    cargado.predict(vector)
    
    from sklearn.externals import joblib
    joblib.dump(kmeans, 'modelo.pkl') 
    
   otra=joblib.load('modelo.pkl')
    otra.predict(vector)
    

if __name__ == "__main__":
    init()